import { DEFAULT_DEPTH } from "../constants.js"
import { getWinPercentage } from "../controller/find_win_percentage.js"

export class PositionReport {
	depth: string
	eval: string
	winPercentage: number
	bestmove: string
	bestmoveLine: string[]

	constructor({depth, evalReport, bestmove, bestmoveLine}: {
		depth?: string,
		evalReport: { type: string, value: number },
		bestmove: string,
		bestmoveLine: string[]
	}) {
		if (evalReport == null || bestmove == null || bestmoveLine == null)
			throw new Error("Some Parameter in missing")

		this.depth = depth || DEFAULT_DEPTH

		this.bestmove = bestmove
		this.bestmoveLine = bestmoveLine

		if (evalReport["type"] == "cp") {
			let val = evalReport["value"]
			this.eval = String(val / 100)
			this.winPercentage = getWinPercentage(val)
		} else if (evalReport["type"] == "mate") {
			let val = evalReport["value"]
			let isWhiteWinning = val >= 0
			this.eval = (isWhiteWinning ? "" : "-") + "M" + Math.abs(val)
			this.winPercentage = isWhiteWinning ? 100 : 0
		} else {
			throw new TypeError("Wrong Evaluation")
		}
	}
}