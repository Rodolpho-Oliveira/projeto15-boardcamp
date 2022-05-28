import express from "express";
import categoryRouter from "./routes/categoryRouter.js";
import gameRouter from "./routes/gameRouter.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.use(categoryRouter)
app.use(gameRouter)

app.listen(4000)