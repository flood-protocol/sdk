/**
 * @description
 * Converts a bigint to a string when stringifying JSON.
 * @example
 *
 * JSON.stringify({ a: 1n }, bigIntToJson)
 */
export function bigIntToJson(_: unknown, v: unknown) {
	return typeof v === "bigint" ? v.toString() : v
}
