import { createClient, getClients } from "../controllers/clientController.js"
import { Router } from "express"

const clientRouter = Router()

clientRouter.get("/customers", getClients)
clientRouter.get("/customers/:id", getClients)
clientRouter.post("/customers", createClient)

export default clientRouter