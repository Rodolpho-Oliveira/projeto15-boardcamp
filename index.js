import express from "express";
import categoryRouter from "./routes/categoryRouter.js";

const app = express()

app.use(categoryRouter)


app.listen(4000)