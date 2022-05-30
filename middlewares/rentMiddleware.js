import connectDB from "../database.js"

export async function getRentValidation(req, res, next){
    const {customerId, gameId} = req.query
    let query = ""
    let params = []
    if(customerId && gameId){
        query = `WHERE rentals."customerId" = $1 AND rentals."gameId" = $2`
		params = [customerId, gameId]
    }
    else if(gameId){
        query = `WHERE rentals."gameId" = $1`
		params = [gameId]
    }
    else if(customerId){
        query = `WHERE rentals."customerId" = $1`
		params = [customerId]
    }
    res.locals.query = query
	res.locals.params = params
	next()
}

export async function customerRentValidation(req, res, next){
    const {customerId, gameId, daysRented} = req.body
    const db = await connectDB()
    const customer = await db.query('SELECT * FROM customers WHERE id=$1',[customerId])
    if(customer.rows.length === 0){
        return res.sendStatus(400)
    }
    const {rows} = await db.query('SELECT * FROM games WHERE id=$1',[gameId])
    if(rows.length === 0){
        return res.sendStatus(400)
    }
    if(daysRented <= 0){
        return res.sendStatus(400)
    }
    const rents = await db.query('SELECT * FROM rentals WHERE "gameId"=$1',[gameId])
    if(rows[0].stockTotal <= rents.rows.length){
        return res.sendStatus(400)
    }  
    next()
}

export async function finishRentValidation(req, res, next){
    const {id} = req.params
    try{
        const db = await connectDB()
        const {rows} = await db.query('SELECT * FROM rentals WHERE id=$1',[id])
        if(rows.length === 0){
            return res.sendStatus(404)
        }
        else{
            if(rows[0].returnDate){
                return res.sendStatus(400)
            }  
        }
        next()
    }catch(e){
        console.log(e)
        return res.sendStatus(500)
    }
}