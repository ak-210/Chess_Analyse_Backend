import express from "express"
import analyseRouter from "./routes/analyse.js"

const app = express()

app.use(express.json())
app.use("/analyse", analyseRouter)

app.listen(3000)