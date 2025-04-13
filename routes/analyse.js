const express = require("express")
const router = express.Router()
const { getPositionAnalyses } = require("./position_analyses.js")

router.post("/position", getPositionAnalyses)

router.post("/game", (req, res) => { })

module.exports = router