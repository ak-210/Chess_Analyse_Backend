import { DEFAULT_DEPTH } from "../constants.js"
import { FindWinPercentage } from "../controller/find_win_percentage.js"

export class PositionReport {
	constructor({depth, evalReport, bestmove, bestmoveLine}) {
		if (evalReport == null || bestmove == null || bestmoveLine == null)
			throw new Error("Some Parameter in missing")

		this.depth = depth || DEFAULT_DEPTH

		this.bestmove = bestmove
		this.bestmoveLine = bestmoveLine.toString().split(" ")

		if (evalReport["type"] == "cp") {
			let val = evalReport["value"]
			this.eval = val / 100
			this.winPercentage = FindWinPercentage(val)
		} else if (evalReport["type"] == "mate") {
			let val = evalReport["value"]
			let isWhiteWinning = val >= 0
			this.eval = (isWhiteWinning ? "" : "-") + "M" + Math.abs(val)
		} else {
			throw new TypeError("Wrong Evaluation")
		}
	}
}