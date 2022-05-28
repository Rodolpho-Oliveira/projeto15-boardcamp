import { Router } from "express"
import { getCategories, createCategories } from "../controllers/categoryController.js"
import { categoryValidation } from "../middlewares/categoryMiddleware.js"

const categoryRouter = Router()

categoryRouter.get("/categories", getCategories)
categoryRouter.post("/categories", categoryValidation, createCategories)

export default categoryRouter