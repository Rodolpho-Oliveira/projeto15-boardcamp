import Joi from "joi"
import connectDB from "../database.js"

export async function gamesValidation(req, res, next){
    const gameSchema = Joi.object({
        name: Joi.string().required(),
        stockTotal: Joi.number().min(1),
        pricePerDay: Joi.number().min(1),
        categoryId: Joi.number(),
        image: Joi.string()
    })
    const validation = gameSchema.validate(req.body)
    if(validation.error){
        res.status(400).send("Preencha corretamente!")
    }
    try{
        const db = await connectDB()

        const id = await db.query('SELECT * FROM categories WHERE id=$1',[req.body.categoryId])
        if(id.rows.length === 0){
            return res.sendStatus(400)
        }
        const {rows} = await db.query('SELECT * FROM games WHERE name=$1',[req.body.name])
        if(rows.length !== 0){
            return res.sendStatus(409)
        }
    }catch(e){
        return res.status(500).send('Database connection error')
    }
    next()
}