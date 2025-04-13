import { evaluatePosition } from "../controller/position_evaluation.js"
import { SERVER_ERROR, FEN_MISSING } from "../constants.js"
import { PositionReport } from "../models/position_report.js"

export async function getPositionAnalyses(req, res) {
	var fen = req.body.fen
	var depth = req.body.depth

	if (fen == null) {
		res.status(400).send(FEN_MISSING)
	}

	try {
		var positionReport = await evaluatePosition(fen, depth)
		if (positionReport instanceof PositionReport) {
			res.json(positionReport)
		} else {
			res.status(400).message(positionReport.message || positionReport)
		}
	} catch (error) {
		res.status(400).send(SERVER_ERROR)
	}
}