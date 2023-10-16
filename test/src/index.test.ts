import { expect, test, beforeAll } from "bun:test"

import { quote } from "~flood-sdk/core/quote.js"
import { arbitrum } from "~flood-sdk/chains/arbitrum.js"
import { server } from "./mocks/server.js"

beforeAll(() => {
	server.listen()
})

const tokensIn = {
	"0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": 1n,
	"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": 1n
}
const tokenOut = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"

test("quote", async () => {
	const amountQuote = await quote(arbitrum, {
		tokensIn,
		tokenOut
	});
    expect(amountQuote).toBe(1n)

})
