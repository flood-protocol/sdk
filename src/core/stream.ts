// This software includes code derived from https://github.com/openai/openai-node/blob/master/src/streaming.ts#L289
// used under the Apache License Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0).
// Modifications to the original software were made on 18/10/2023 to remove the `OpenAIError` and replace it with `Error`.

type Bytes = string | ArrayBuffer | Uint8Array | Buffer | null | undefined

type ServerSentEvent = {
	event: string | null
	data: string
	raw: string[]
}

export class Stream<Item> implements AsyncIterable<Item> {
	controller: AbortController

	constructor(
		private iterator: () => AsyncIterator<Item>,
		controller: AbortController
	) {
		this.controller = controller
	}

	static fromSSEResponse<Item>(
		response: Response,
		controller: AbortController
	) {
		let consumed = false
		const decoder = new SSEDecoder()

		async function* iterMessages(): AsyncGenerator<
			ServerSentEvent,
			void,
			unknown
		> {
			if (!response.body) {
				controller.abort()
				throw new Error(`Attempted to iterate over a response with no body`)
			}

			const lineDecoder = new LineDecoder()

			const iter = readableStreamAsyncIterable<Bytes>(response.body)
			for await (const chunk of iter) {
				for (const line of lineDecoder.decode(chunk)) {
					const sse = decoder.decode(line)
					if (sse) yield sse
				}
			}

			for (const line of lineDecoder.flush()) {
				const sse = decoder.decode(line)
				if (sse) yield sse
			}
		}

		async function* iterator(): AsyncIterator<Item, any, undefined> {
			if (consumed) {
				throw new Error(
					"Cannot iterate over a consumed stream, use `.tee()` to split the stream."
				)
			}
			consumed = true
			let done = false
			try {
				for await (const sse of iterMessages()) {
					if (done) continue

					if (sse.data.startsWith("[DONE]")) {
						done = true
						continue
					}

					if (sse.event === null) {
						let data

						try {
							data = JSON.parse(sse.data)
						} catch (e) {
							console.error(`Could not parse message into JSON:`, sse.data)
							console.error(`From chunk:`, sse.raw)
							throw e
						}

						if (data && data.error) {
							throw new Error(undefined, data.error)
						}

						yield data
					}
				}
				done = true
			} catch (e) {
				// If the user calls `stream.controller.abort()`, we should exit without throwing.
				if (e instanceof Error && e.name === "AbortError") return
				throw e
			} finally {
				// If the user `break`s, abort the ongoing request.
				if (!done) controller.abort()
			}
		}

		return new Stream(iterator, controller)
	}

	// Generates a Stream from a newline-separated ReadableStream where each item
	// is a JSON Value.
	static fromReadableStream<Item>(
		readableStream: ReadableStream,
		controller: AbortController
	) {
		let consumed = false

		async function* iterLines(): AsyncGenerator<string, void, unknown> {
			const lineDecoder = new LineDecoder()

			const iter = readableStreamAsyncIterable<Bytes>(readableStream)
			for await (const chunk of iter) {
				for (const line of lineDecoder.decode(chunk)) {
					yield line
				}
			}

			for (const line of lineDecoder.flush()) {
				yield line
			}
		}

		async function* iterator(): AsyncIterator<Item, any, undefined> {
			if (consumed) {
				throw new Error(
					"Cannot iterate over a consumed stream, use `.tee()` to split the stream."
				)
			}
			consumed = true
			let done = false
			try {
				for await (const line of iterLines()) {
					if (done) continue
					if (line) yield JSON.parse(line)
				}
				done = true
			} catch (e) {
				// If the user calls `stream.controller.abort()`, we should exit without throwing.
				if (e instanceof Error && e.name === "AbortError") return
				throw e
			} finally {
				// If the user `break`s, abort the ongoing request.
				if (!done) controller.abort()
			}
		}

		return new Stream(iterator, controller)
	}

	[Symbol.asyncIterator](): AsyncIterator<Item> {
		return this.iterator()
	}

	tee(): [Stream<Item>, Stream<Item>] {
		const left: Array<Promise<IteratorResult<Item>>> = []
		const right: Array<Promise<IteratorResult<Item>>> = []
		const iterator = this.iterator()

		const teeIterator = (
			queue: Array<Promise<IteratorResult<Item>>>
		): AsyncIterator<Item> => {
			return {
				next: () => {
					if (queue.length === 0) {
						const result = iterator.next()
						left.push(result)
						right.push(result)
					}
					return queue.shift()!
				}
			}
		}

		return [
			new Stream(() => teeIterator(left), this.controller),
			new Stream(() => teeIterator(right), this.controller)
		]
	}

	// Converts this stream to a newline-separated ReadableStream of JSON Stringified values in the stream
	// which can be turned back into a Stream with Stream.fromReadableStream.
	toReadableStream(): ReadableStream {
		const self = this
		let iter: AsyncIterator<Item>
		const encoder = new TextEncoder()

		return new ReadableStream({
			async start() {
				iter = self[Symbol.asyncIterator]()
			},
			async pull(ctrl) {
				try {
					const { value, done } = await iter.next()
					if (done) return ctrl.close()

					const bytes = encoder.encode(JSON.stringify(value) + "\n")

					ctrl.enqueue(bytes)
				} catch (err) {
					ctrl.error(err)
				}
			},
			async cancel() {
				await iter.return?.()
			}
		})
	}
}

class SSEDecoder {
	private data: string[]
	private event: string | null
	private chunks: string[]

	constructor() {
		this.event = null
		this.data = []
		this.chunks = []
	}

	decode(line: string) {
		if (line.endsWith("\r")) {
			line = line.substring(0, line.length - 1)
		}

		if (!line) {
			// empty line and we didn't previously encounter any messages
			if (!this.event && !this.data.length) return null

			const sse: ServerSentEvent = {
				event: this.event,
				data: this.data.join("\n"),
				raw: this.chunks
			}

			this.event = null
			this.data = []
			this.chunks = []

			return sse
		}

		this.chunks.push(line)

		if (line.startsWith(":")) {
			return null
		}

		let [fieldname, _, value] = partition(line, ":")

		if (value.startsWith(" ")) {
			value = value.substring(1)
		}

		if (fieldname === "event") {
			this.event = value
		} else if (fieldname === "data") {
			this.data.push(value)
		}

		return null
	}
}

/**
 * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
 * reading lines from text.
 *
 * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
 */
class LineDecoder {
	// prettier-ignore
	static NEWLINE_CHARS = new Set([
		"\n",
		"\r",
		"\x0b",
		"\x0c",
		"\x1c",
		"\x1d",
		"\x1e",
		"\x85",
		"\u2028",
		"\u2029"
	])
	static NEWLINE_REGEXP = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g

	buffer: string[]
	trailingCR: boolean
	textDecoder: any // TextDecoder found in browsers; not typed to avoid pulling in either "dom" or "node" types.

	constructor() {
		this.buffer = []
		this.trailingCR = false
	}

	decode(chunk: Bytes): string[] {
		let text = this.decodeText(chunk)

		if (this.trailingCR) {
			text = "\r" + text
			this.trailingCR = false
		}
		if (text.endsWith("\r")) {
			this.trailingCR = true
			text = text.slice(0, -1)
		}

		if (!text) {
			return []
		}

		const trailingNewline = LineDecoder.NEWLINE_CHARS.has(
			text[text.length - 1] || ""
		)
		let lines = text.split(LineDecoder.NEWLINE_REGEXP)

		if (lines.length === 1 && !trailingNewline) {
			this.buffer.push(lines[0]!)
			return []
		}

		if (this.buffer.length > 0) {
			lines = [this.buffer.join("") + lines[0], ...lines.slice(1)]
			this.buffer = []
		}

		if (!trailingNewline) {
			this.buffer = [lines.pop() || ""]
		}

		return lines
	}

	decodeText(bytes: Bytes): string {
		if (bytes == null) return ""
		if (typeof bytes === "string") return bytes

		// Node:
		if (typeof Buffer !== "undefined") {
			if (bytes instanceof Buffer) {
				return bytes.toString()
			}
			if (bytes instanceof Uint8Array) {
				return Buffer.from(bytes).toString()
			}

			throw new Error(
				`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`
			)
		}

		// Browser
		if (typeof TextDecoder !== "undefined") {
			if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
				this.textDecoder ??= new TextDecoder("utf8")
				return this.textDecoder.decode(bytes)
			}

			throw new Error(
				`Unexpected: received non-Uint8Array/ArrayBuffer (${
					(bytes as any).constructor.name
				}) in a web platform. Please report this error.`
			)
		}

		throw new Error(
			"Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error."
		)
	}

	flush(): string[] {
		if (!this.buffer.length && !this.trailingCR) {
			return []
		}

		const lines = [this.buffer.join("")]
		this.buffer = []
		this.trailingCR = false
		return lines
	}
}

function partition(str: string, delimiter: string): [string, string, string] {
	const index = str.indexOf(delimiter)
	if (index !== -1) {
		return [
			str.substring(0, index),
			delimiter,
			str.substring(index + delimiter.length)
		]
	}

	return [str, "", ""]
}

/**
 * Most browsers don't yet have async iterable support for ReadableStream,
 * and Node has a very different way of reading bytes from its "ReadableStream".
 *
 * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */
function readableStreamAsyncIterable<T>(stream: any): AsyncIterableIterator<T> {
	if (stream[Symbol.asyncIterator]) return stream

	const reader = stream.getReader()
	return {
		async next() {
			try {
				const result = await reader.read()
				if (result?.done) reader.releaseLock() // release lock when stream becomes closed
				return result
			} catch (e) {
				reader.releaseLock() // release lock when stream becomes errored
				throw e
			}
		},
		async return() {
			const cancelPromise = reader.cancel()
			reader.releaseLock()
			await cancelPromise
			return { done: true, value: undefined }
		},
		[Symbol.asyncIterator]() {
			return this
		}
	}
}
