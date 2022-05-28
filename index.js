import express from "express";
import categoryRouter from "./routes/categoryRouter.js";
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(categoryRouter)

app.listen(4000)