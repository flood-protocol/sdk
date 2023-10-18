import { rest } from "msw"
import { arbitrum } from "~flood-sdk/chains/index.js"
import { Order, OrderStatus } from "~flood-sdk/types/index.js"
import { mockOrder } from "./data.js"

interface QuoteBody {
	tokensIn: {
		[token: `0x${string}`]: string
	}
	tokenOut: `0x${string}`
}

interface QuoteResponse {
	amountQuote: string
}

const quote = rest.post<QuoteBody, QuoteResponse>(
	`${arbitrum.floodUrl}/quote`,
	async (_req, res, ctx) => {
		return res(
			ctx.json({
				amountQuote: BigInt(1).toString()
			})
		)
	})

interface GetOrderBody {
	offerer: `0x${string}`
}

interface GetOrderResponse {
	orderHash: `0x${string}`
	order: Order,
	signature: `0x${string}`
	orderStatus: OrderStatus
}


export const handlers = [
	quote
]
