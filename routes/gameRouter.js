import { Router } from "express"
import { createGame, getGames } from "../controllers/gameController.js"
import { gamesValidation } from "../middlewares/gameMiddleware.js"

const gameRouter = Router()

gameRouter.get("/games", getGames)
gameRouter.post("/games", gamesValidation ,createGame)

export default gameRouter