import connectDB from "../database.js"

export async function getCategories(req, res){
    try{
        const db = await connectDB()
        const {rows} = await db.query('SELECT * FROM categories')
        res.status(200).send(rows)
    }catch(e){
        res.status(500).send("Database connection error")
    }
}

export async function createCategories(req, res){
    const name = req.body
    console.log(name.name)
    try{
        const db = await connectDB()
        await db.query('INSERT INTO categories (name) VALUES ($1)', [name.name])
        return res.sendStatus(201)
    }catch(e){
        res.status(500).send("Database connection error")
    }
}
