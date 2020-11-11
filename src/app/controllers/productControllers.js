
const Product = require('../models/products')

module.exports  = {



  create(req, res){
    return res.render('recipe/create')
  },

  async post(req, res){

    const keys = Object.keys(req.body)

    for(key of keys){
      if(req.body[key] == "") return res.send("porfavor preencha o  campo" + " " + key)
    }


    let results  =  await Product.create(req.body)

    const product_id = results.rows[0].id

    return res.redirect('/admin/recipe/create')
  },


  async edit(req,  res){

    let results = await Product.find(req.params.id)

    const product = results.rows[0]

    if(!product) return res.send('Product Not-Found To  Edit')


    return res.render('recipe/edit', {product})
  },

  async show(req,  res){

    let results = await Product.find(req.params.id)

    const product = results.rows[0]

    if(!product) return res.send('Product Not-Found To  show')


    return res.render('recipe/show', {product})
  },


 async  put(req, res){


  const keys = Object.keys(req.body)

  for(key of keys){
    if(req.body[key] == "" && key != "id") return res.send("porfavor preencha o  campo" + " " + key)
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