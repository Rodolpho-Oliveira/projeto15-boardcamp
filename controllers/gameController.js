import connectDB from "../database.js"

export async function getGames(req,res){
    const {name} = req.query
    const db = await connectDB()
    try{
        const {rows} = await db.query('SELECT * FROM games WHERE name=$1',[name])
        res.status(200).send(rows)
    }catch(e){
        res.sendStatus(500)
    }
}

export async function createGame(req,res){
    const game = req.body
    try{
        const db = await connectDB()
        await db.query('INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)',[game.name,game.image,game.stockTotal,game.categoryId,game.pricePerDay])
        return res.status(201).send("Game created")
    }catch(e){
        console.log(e)
        return res.sendStatus(500)
    }
}