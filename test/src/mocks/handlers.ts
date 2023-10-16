import { rest } from "msw"
import { arbitrum } from "~flood-sdk/chains/index.js"

interface QuoteBody {
	tokensIn: {
		[token: `0x${string}`]: string
	}
	tokenOut: `0x${string}`
}

interface QuoteResponse {
	amountQuote: string
}

export const handlers = [
	rest.post<QuoteBody, QuoteResponse>(
		`${arbitrum.floodUrl}/quote`,
		async (_req, res, ctx) => {
			return res(
				ctx.json({
					amountQuote: 1n.toString()
				})
			)
		}
	)
]
