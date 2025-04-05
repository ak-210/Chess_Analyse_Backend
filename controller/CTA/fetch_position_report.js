import { LICHESS_BASE, LICHESS_POSITION, SERVER_ERROR } from "../../constants.js";
import { PositionReport } from "../../models/position_report.js";
import { AddQueryParam } from "./add_query_param.js";

export async function FetchPositionReport(posFen) {
	var response = await fetch(LICHESS_BASE + LICHESS_POSITION + AddQueryParam({"fen": posFen})).catch(_ => SERVER_ERROR)
	var data = await response.data
	
	if(response == SERVER_ERROR) return response

	return PositionReport.fromJSON(data)
}