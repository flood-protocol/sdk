import { expect, test, beforeAll } from "bun:test"

import { quote, getOrders, watchOrders} from "~flood-sdk/core/index.js"
import { arbitrum } from "~flood-sdk/chains/arbitrum.js"
import { server } from "./mocks/server.js"
import { mockOrder } from "mocks/data.js"

beforeAll(() => {
	// server.listen()
})

const tokensIn = {
	"0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": 1n,
	"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": 1n
}
const tokenOut = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"

// test("quote", async () => {
// 	const amountQuote = await quote(arbitrum, {
// 		tokensIn,
// 		tokenOut
// 	});
//     expect(amountQuote).toBe(1n)

// })

// test("get orders", async () => {
// 	 const orders = await getOrders(arbitrum, mockOrder.offerer);
// 	 expect(orders).toEqual([])
// })

test("watch orders", async () => {
	const unwatch = await watchOrders(arbitrum, mockOrder.offerer, {
		onOrder: (order) => {
			expect(order).toEqual(mockOrder)
			unwatch()
		}})

		unwatch()

})