import { Chess } from "chess.js"
import { FEN_ERROR, SERVER_ERROR } from "../constants.js"
import { FetchPositionReport } from "./CTA/fetch_position_report.js"

export async function EvaluatePosition(fen)  {
	try {
		const chess = new Chess(fen)
		console.log(fen)
		var positionReport = await FetchPositionReport(fen)

		return positionReport
	} catch (error) {
		return FEN_ERROR
	}
}