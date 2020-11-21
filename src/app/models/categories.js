const BancodeDados = require('../../config/conectionDB')

exports.category = function() {
   return BancodeDados.query(`SELECT * FROM categories `)
}