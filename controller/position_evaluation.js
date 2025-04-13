import { Chess } from "chess.js"
import { FEN_ERROR, SERVER_ERROR } from "../constants.js"
import { evaluateFen } from "./evaluate_fen.js"

export async function evaluatePosition(fen, depth) {
	try {
		const chess = new Chess(fen)
		var positionReport = await evaluateFen(fen, depth)
			.catch(err => err)

		return positionReport
	} catch (error) {
		return FEN_ERROR // To catch error when initilasing fen
	}
}