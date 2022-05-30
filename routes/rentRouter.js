import { Router } from "express"
import { createRent, deleteRent, finishRent, getRent } from "../controllers/rentController.js"
import { getRentValidation, customerRentValidation, finishRentValidation } from "../middlewares/rentMiddleware.js"

const rentRouter = Router()

rentRouter.get("/rentals", getRentValidation ,getRent)
rentRouter.post("/rentals", customerRentValidation, createRent)
rentRouter.post("/rentals/:id/return", finishRentValidation, finishRent)
rentRouter.delete("/rentals/:id", finishRentValidation,deleteRent)

export default rentRouter