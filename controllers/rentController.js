import connectDB from "../database.js"
import dayjs from "dayjs"

export async function getRent(req, res){
    const {query, params} = res.locals
    try{
        const db = await connectDB()
            const {rows} = await db.query(`
            SELECT rentals.*, customers.id AS "customerId", customers.name AS "customerName", 
                games.id AS "gameId", games.name AS "gameName", games."categoryId" AS "categoryId",
                categories.name AS "categoryName" 
            FROM rentals 
                JOIN customers ON rentals."customerId" = customers.id
                    JOIN games ON rentals."gameId" = games.id 
                        JOIN categories ON games."categoryId" = categories.id
            
        ` + query, params)
            const finishedRows = rows.map(row => {
                return {
                    id: row.id,
                    customerId: row.customerId,
                    gameId: row.gameId,
                    rentDate: row.rentDate,
                    daysRented: row.daysRented,
                    returnDate: row.returnDate,
                    originalReturnDate: row.originalReturnDate,
                    originalPrice: row.originalPrice,
                    delayFee: row.delayFee,
                    customer: {
                        id: row.customerId,
                        name: row.customerName,
                    },
                    game: {
                        id: row.gameId,
                        name: row.gameName,
                        categoryId: row.categoryId,
                        categoryName: row.categoryName,
                    },
                }
            })
        res.status(200).send(finishedRows)
    }catch(e){
        console.log(e)
        res.status(500).send("Database connection error")
    }
}

export async function createRent(req, res){
    const {customerId, gameId, daysRented} = req.body
    const date = dayjs().format('YYYY-MM-DD')
    try{
        const db = await connectDB()
        const game = await db.query('SELECT * FROM games WHERE id=$1;',[gameId])
        await db.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',[customerId, gameId, date , daysRented, null, (game.rows[0].pricePerDay * daysRented), null])
        res.sendStatus(201)
    }catch(e){
        res.status(500).send("Database connection error")
    }
}

export async function finishRent(req, res){
    const {id} = req.params
    try{
        const db = await connectDB()
        const {rows} = await db.query('SELECT * FROM rentals WHERE id=$1',[id])
        if(rows[0].daysRented <  (dayjs(rows[0].rentDate).format('DD') - dayjs().format('DD'))){
           await db.query('UPDATE rentals SET "returnDate"=$1, "delayFee"= GREATEST((($1 - (rentals."rentDate" + rentals."daysRented")) * rentals."originalPrice"),0) WHERE id=$2',[dayjs().format('YYYY-MM-DD'), id]) 
        }
        else{
            await db.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$3 WHERE id=$2',[dayjs().format('YYYY-MM-DD'), id, 0])
        }
        res.sendStatus(201)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function deleteRent(req, res){
    const {id} = req.params
    try{
        const db = await connectDB()
        db.query('DELETE FROM rentals WHERE id=$1',[id])
        res.sendStatus(200)
    }catch(e){
        res.status(500).send("Database connection error")
    }
}