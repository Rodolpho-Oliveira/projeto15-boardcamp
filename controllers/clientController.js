import connectDB from "../database.js"

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
    const rows = res.locals.rows
    try{
        const db = await connectDB()
        if(rows.length !== 0){
            return res.status(409).send("User already registered")
        }
        await db.query('INSERT INTO customers ("name", "cpf", "birthday", "phone") VALUES ($1, $2, $3, $4) ',[name, cpf, birthday,phone ])
        res.sendStatus(201)
    }catch(e){
        console.log(e)
        res.status(500).send("Database connection error")
    }
}

export async function updateClient(req,res){
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body
    const rows = res.locals.rows
    try{
        const db = await connectDB()
        if(rows.length === 1 && rows[0].id === parseInt(id)){

        }
        else if(rows.length === 0){
            
        }
        else{
            return res.status(409).send("User already registered")
        }
        db.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5',[name, phone, cpf, birthday,id])
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.status(500).send("Database connection error")
    }
}