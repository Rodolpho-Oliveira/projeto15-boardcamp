import connectDB from "../database.js"
import Joi from "joi"
import dayjs from "dayjs"

export async function getClients(req, res){
    const {cpf} = req.query
    const {id} = req.params
    try{
        const db = await connectDB()
        if(id){
            const {rows} = await db.query('SELECT * FROM customers WHERE id = $1;',[id])
            if(rows.length === 0){
                return res.status(404).send("Customer not found")
            }
            return res.status(200).send(rows)
        }
        if(cpf){
            const {rows} = await db.query('SELECT * FROM customers WHERE cpf LIKE $1;',[cpf + "%"])
            return res.status(200).send(rows)
        }
        const {rows} = await db.query('SELECT * FROM customers;')
        res.status(200).send(rows)
    }catch(e){
        console.log(e)
        res.status(500).send("Database connection error")
    }
}

export async function createClient(req, res){
    const {name, phone, cpf, birthday} = req.body
    const clientSchema = Joi.object({
        name: Joi.string().required(),
        cpf: Joi.string().min(11).required(),
        phone: Joi.string().min(10).max(11).required(),
        birthday: Joi.string().required()
    })
    const validation = clientSchema.validate(req.body)
    if(validation.error){
        console.log(validation.error)
        return res.status(400).send("Preencha corretamente")
    }
    try{
        const db = await connectDB()
        if(dayjs(birthday).format('YYYY-MM-DD') !== birthday){
            return res.status(400).send('Wrong date')
        }
        const {rows} = await db.query('SELECT * FROM customers WHERE cpf=$1',[cpf])
        if(rows.length !== 0){
            return res.status(409).send("User already registered")
        }
        await db.query('INSERT INTO customers ("name", "cpf", "birthday", "phone") VALUES ($1, $2, $3, $4) ',[name, cpf, birthday,phone ])
        res.status(201).send("Client registered")
    }catch(e){
        console.log(e)
        res.status(500).send("Database connection error")
    }
}