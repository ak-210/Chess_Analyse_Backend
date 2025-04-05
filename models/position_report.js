import { FindWinPercentage } from "../controller/find_win_percentage.js"

export class PositionReport {
	constructor({ depth, evaluation, winPercentage, bestmove, bestmoveLine }) {
		this.depth = depth
		this.eval = evaluation
		this.winPercentage = winPercentage
		this.bestmove = bestmove
		this.bestmoveLine = bestmoveLine
	}

	static fromJSON(json) {
		const data = JSON.parse(json)
		const [pvs] = data["pvs"]
		let [bestmove, ...line] = pvs["moves"].split(" ")

		if ("cp" in pvs) {
			let cp = pvs["cp"]
			return new PositionReport({
				evaluation: cp/100,
				winPercentage: FindWinPercentage(cp),
				bestmove: bestmove,
				bestmoveLine: line
			})
		} else if("mate" in pvs) {
			var isWhiteWinning = pvs["mate"] >= 0
			var posEval = (isWhiteWinning ? "" : "-") + "M" + Math.abs(pvs["mate"])
			var winChance = isWhiteWinning ? 100 : 0

			return new PositionReport({
				depth: data.depth,
				evaluation: posEval,
				winPercentage: winChance,
				bestmove: bestmove,
				bestmoveLine: line
			})
		} else {
			throw new TypeError("Wrong Evaluation")
		}
	}
}