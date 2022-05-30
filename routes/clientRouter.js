import { createClient, getClients, updateClient } from "../controllers/clientController.js"
import { clientValidation } from "../middlewares/clientMiddleware.js"
import { Router } from "express"

const clientRouter = Router()

clientRouter.get("/customers", getClients)
clientRouter.get("/customers/:id", getClients)
clientRouter.post("/customers", clientValidation, createClient)
clientRouter.put("/customers/:id", clientValidation, updateClient)

export default clientRouter