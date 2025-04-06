const express = require("express")
const router = express.Router()
const { EvaluatePosition } = require("../controller/position_evaluation")
const { SERVER_ERROR, FEN_MISSING } = require("../constants.js")
const { PositionReport } = require("../models/position_report")

router.post("/position", async function (req, res) {
	var fen = req.body.fen
	var depth = req.body.depth

	if (fen == null) {
		res.status(400).send(FEN_MISSING)
	}

	try {
		var positionReport = await EvaluatePosition(fen, depth)
		if (positionReport instanceof PositionReport) {
			res.json(positionReport)
		} else {
			res.status(400).message(positionReport.message || positionReport)
		}
	} catch (error) {
		res.status(400).send(SERVER_ERROR)
	}
})

router.post("/game", (req, res) => { })

module.exports = router