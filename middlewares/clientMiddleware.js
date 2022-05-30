import connectDB from "../database.js"
import Joi from "joi"
import dayjs from "dayjs"

export async function clientValidation(req, res, next){
    const {id} = req.params
    const {cpf, birthday} = req.body
    const clientSchema = Joi.object({
        name: Joi.string().required(),
        cpf: Joi.string().min(11).required(),
        phone: Joi.string().min(10).max(11).required(),
        birthday: Joi.string().required()
    })
    const validation = clientSchema.validate(req.body)
    if(validation.error){
        console.log(validation.error)
        return res.sendStatus(400)
    }
    try{
        const db = await connectDB()
        if(dayjs(birthday).format('YYYY-MM-DD') !== birthday){
            return res.sendStatus(400)
        }
        const {rows} = await db.query('SELECT * FROM customers WHERE cpf=$1',[cpf])
        res.locals.rows = rows
        
    }catch(e){
        console.log(e)
        return res.status(500).send("Database connection error")
    }
    next()
}