const express = require("express")
const app = express()

app.use(express.json())

const analyseRouter = require("./routes/analyse")
app.use("/analyse", analyseRouter)

app.listen(3000)