import connection from "../database.js"

export async function getCategories(req, res){
    try{
        const query = await connection.query('SELECT * FROM categories')
        console.log(query)
        res.status(200).send(query)
    }
    catch(e){
        console.log(e)
        res.status(500).send("Deu ruim")
    }
}

