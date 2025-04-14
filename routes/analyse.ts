import express from "express"
import { getPositionAnalyses } from "./position_analyses.js"

const router = express.Router()

router.post("/position", getPositionAnalyses)

router.post("/game", (req, res) => { })

export default router