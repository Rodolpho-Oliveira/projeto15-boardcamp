import connectDB from "../database.js"
import Joi from "joi"

export async function categoryValidation(req, res, next){
    const name = req.body
    const categorySchema = Joi.object({
        name: Joi.string().required()
    })
    const validation = categorySchema.validate(name)
    if(validation.error){
        return res.sendStatus(400)
    }
    try{
        const db = await connectDB()
        const {rows} = await db.query('SELECT * FROM categories WHERE name=$1', [name.name])
        if(rows.length !== 0){
           return res.sendStatus(409) 
        }
    }catch(e){
        
    }
    next()
}