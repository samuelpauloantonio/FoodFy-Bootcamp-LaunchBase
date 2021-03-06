const BancodeDandos = require("../../config/conectionDB");

module.exports = {

    all(){
        return BancodeDandos.query(`SELECT * FROM  products ORDER BY updated_at DESC`)
    },
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
                old_price,
                price,
                url_image
            )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            RETURNING id
 
        `;
            
        data.price = data.price.replace(/\D/g,"")
        
        const values = [
            data.category_id,
            data.users_id,
            data.name,
            data.ingrediente,
            data.preparo,
            data.description,
            data.quantity,
            data.status,
            data.old_price || data.price,
            data.price,
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
                old_price = ($9),
                price = ($10),
                url_image  = ($11)

             WHERE   id =  $12
             
        `

        data.price = data.price.replace(/\D/g,"")
       
        const values = [
            data.category_id ,
            data.users_id ,
            data.name,
            data.ingrediente,
            data.preparo,
            data.description,
            data.quantity,
            data.status ,
            data.old_price || data.price,
            data.price,
            data.url_image,
            data.id
        ];


       
       try{
        return BancodeDandos.query(query, values)
       }catch(error){
           console.log(error)
       }
            
    
    },

    search(params){

        const {filter, category} = params 

          let query = "",
              filterQuery = `WHERE`

            if(category){
              filterQuery = `${filterQuery}
              products.category_id = ${category}
              AND
              `
            }

            filterQuery = `${filterQuery}
            products.name ILIKE '%${filter}%'
            OR products.description ILIKE '%${filter}%'
            `

           
            
            query = `
              SELECT products.*,
              categories.name   AS category_name
              FROM products 
              LEFT JOIN categories ON(categories.id = products.category_id)
              ${filterQuery}
          
            `

            return BancodeDandos.query(query)

      },


    delete(id){

        return BancodeDandos.query(` DELETE FROM products WHERE id = $1`, [id])
    },

    files(id){
        return BancodeDandos.query(`
            SELECT * FROM files WHERE product_id = $1
        
        `,[id])
    }
};
