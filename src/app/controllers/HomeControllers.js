const Product = require('../../app/models/products')
const Files  = require('../../app/models/file')
const  { formatPrice }  = require('../../lib/utils')

module.exports = {
   async index(req, res){

        let results  = await Product.all()

        const products = results.rows 

        if(!products) return res.send('product not Found')

        async function getImage(productID){
            let results  = await Files.find(productID)
            const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
            
            return files[0]
        }

        const modificationSeingleProducts = products.map( async product =>{
            product.img =  await getImage(product.id)
            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)

  

            return product

        }).filter((product, index )=> index > 5 ? false : true ) 

        const  UltimoAddicionado = await Promise.all(modificationSeingleProducts)

        
 
        return res.render('home/index', { products : UltimoAddicionado })


    }


}