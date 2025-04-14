import { evaluatePosition } from "../controller/position_evaluation.js"
import { SERVER_ERROR, FEN_MISSING } from "../constants.js"
import { PositionReport } from "../models/position_report.js"
import { Request, Response } from 'express'

export async function getPositionAnalyses(req: Request, res: Response) {
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
			res.status(400).send(positionReport)
		}
	} catch (error) {
		res.status(400).send(SERVER_ERROR)
	}
}