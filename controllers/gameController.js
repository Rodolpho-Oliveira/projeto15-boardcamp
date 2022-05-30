import connectDB from "../database.js"

export async function getGames(req,res){
    const {name} = req.query
    try{
        const db = await connectDB()
        if(name){
            const {rows} = await db.query('SELECT * FROM games WHERE LOWER(name) LIKE LOWER($1)',[name + "%"])
            return res.status(200).send(rows)
        }
        const {rows} = await db.query('SELECT * FROM games')
        res.status(200).send(rows)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function createGame(req,res){
    const game = req.body
    try{
        const db = await connectDB()
        await db.query('INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)',[game.name,game.image,game.stockTotal,game.categoryId,game.pricePerDay])
        return res.sendStatus(201)
    }catch(e){
        console.log(e)
        return res.sendStatus(500)
    }
}