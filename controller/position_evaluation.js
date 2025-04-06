import { Chess } from "chess.js"
import { FEN_ERROR, SERVER_ERROR } from "../constants.js"
import { EvaluateFen } from "./evaluate_fen.js"

export async function EvaluatePosition(fen, depth) {
	try {
		const chess = new Chess(fen)
		var positionReport = await EvaluateFen(fen, depth)
			.catch(err => err)

		return positionReport
	} catch (error) {
		return FEN_ERROR // To catch error when initilasing fen
	}
}