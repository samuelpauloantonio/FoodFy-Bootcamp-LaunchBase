const BancodeDandos = require("../../config/conectionDB");

module.exports = {
    create(data) {
        const query = `
            INSERT INTO products(

                category_id,
                users_id,
                name,
                ingrediente,
                preparo,
                description,
                quantity,
                status,
                Old_price,
                price,
                url_image
            )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING id

        `;

        const values = [
            data.category_id || 1,
            data.users_id || 1,
            data.name,
            data.ingrediente,
            data.preparo,
            data.description,
            data.quantity,
            data.status || 1,
            data.Old_price || data.price,
            data.price || 100,
            data.url_image,
        ];

       
        try{
            return BancodeDandos.query(query, values)
           }catch(error){
               console.log(error)
           }
    },


    find(id){
       return  BancodeDandos.query(`
            SELECT * FROM products WHERE id = $1
        `, [id])
    },

    update(data){
        const query = `
            UPDATE products SET 

                category_id = ($1),
                users_id = ($2),
                name = ($3),
                ingrediente = ($4),
                preparo = ($5),
                description = ($6),
                quantity = ($7),
                status = ($8),
                Old_price = ($9),
                price = ($10),
                url_image  = ($11)

             WHERE   id =  $12
             
        `


        const values = [
            data.category_id || 1,
            data.users_id || 1,
            data.name,
            data.ingrediente,
            data.preparo,
            data.description,
            data.quantity,
            data.status ,
            data.Old_price,
            data.price || 100,
            data.url_image,
            data.id
        ];


       
       try{
        return BancodeDandos.query(query, values)
       }catch(error){
           console.log(error)
       }
            
    
    },

    delete(id){

        return BancodeDandos.query(` DELETE FROM products WHERE id = $1`, [id])
    }
};
