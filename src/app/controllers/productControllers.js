
const Product = require('../models/products')
const  categories = require('../models/categories')
const {formatPrice} = require('../../lib/utils')




 const File  = require('../models/file')

module.exports  = {



   create(req, res){

    categories.category().then( (results)=>{

    const  categories = results.rows

    return res.render('recipe/create', {categories})
      
    }).catch((err) =>{
      throw new Error(err)
    })
   
  },



  async post(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
      if(req.body[key] == "") return res.send("porfavor preencha o  campo" + " " + key + req.files)
    }

    if(req.files.length == 0) {
      return res.send('please send one image')
    }

    let results  =  await Product.create(req.body)
    const product_id = results.rows[0].id

    

    const AllPromiseProduct = req.files.map(file => File.create({...file, product_id}))
  
    await Promise.all(AllPromiseProduct)

    return res.redirect(`/admin/recipe/${product_id}/edit`)
  },


  async edit(req,  res){

    let results = await Product.find(req.params.id)

    const product = results.rows[0]

    if(!product) return res.send('Product Not-Found To  Edit')


    product.price = formatPrice(product.price)
    product.Old_price = formatPrice(product.Old_price)


    results = await categories.category()
 
    const category = results.rows 

    
   results = await File.find(product.id) 

    let files = results.rows

    files = files.map(file => ({
      ...file,
      src : `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))


    return res.render('recipe/edit', {

      categories : category,
      product,
      files
    })
  },

  async show(req,  res){

    let results = await Product.find(req.params.id)

    const product = results.rows[0]

    if(!product) return res.send('Product Not-Found To  show')


    product.price = formatPrice(product.price)
    product.Old_price = formatPrice(product.Old_price)


    results  = await File.find(product.id)

    let files =  results.rows

    files = files.map(file => ({
      ...file,
      src :  `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))



    return res.render('recipe/show', {product,  files })
  },


 async  put(req, res){



 
  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == "" && key != "removed_files"){
      return res.send("porfavor preencha o  campo" + " " + key)
    }
  }

  

  if(req.files != 0){

    const  newPromiseFile  = req.files.map(file => 
      File.create({...file, product_id : req.body.id }))

      await Promise.all(newPromiseFile)
    
  }


  if(req.body.removed_files){
    const removed_files = req.body.removed_files.split(',')

    const lastIndex = removed_files.length - 1

    removed_files.splice(lastIndex, 1)

    const allPromise = await removed_files.map(id => File.delete(id))

    await Promise.all(allPromise)

  }




   req.body.price  = req.body.price.replace(/\D/g,"")

   if(req.body.old_price != req.body.price) {

     const oldProduct = await Product.find(req.body.id)

     req.body.old_price = oldProduct.rows[0].price

   }


  




   await Product.update(req.body)
  
  return res.redirect(`/admin/recipe/${req.body.id}/edit`)
  },



async delete(req, res){
  await Product.delete(req.body.id)

  return res.redirect('/admin/recipe/create')
},



  home(req, res){
    return res.render('home/home')
  }
}