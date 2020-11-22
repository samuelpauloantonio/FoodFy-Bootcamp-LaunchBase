
const BancodeDados  = require('../../config/conectionDB')
const fs = require('fs')

module.exports = {

    create({filename, path, product_id}){
        
        const query = `
            INSERT INTO  files (
                name,
                path,
                product_id
            )VALUES($1, $2, $3)
            RETURNING id
        `

        const values = [
            filename,
            path,
            product_id
        ]

        return BancodeDados.query(query, values)

    },


    find(id){
       return BancodeDados.query(`SELECT * FROM files WHERE product_id = $1`, [id])
    },

    async delete(id){

        try {
            const  results = await BancodeDados.query(`SELECT * FROM files WHERE id = $1`, [id])
        const file  = results.rows[0]

        fs.unlinkSync(file.path)

        return BancodeDados.query(`
            DELETE FROM files WHERE id  = $1
        `, [id]) 

        } catch (error) {
           console.error(error)
        }
    }
}

