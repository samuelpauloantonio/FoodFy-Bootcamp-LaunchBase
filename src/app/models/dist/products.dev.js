"use strict";

var BancodeDandos = require("../../config/conectionDB");

module.exports = {
  all: function all() {
    return BancodeDandos.query("SELECT * FROM  products ORDER BY updated_at DESC");
  },
  create: function create(data) {
    var query = "\n            INSERT INTO products(\n\n                category_id,\n                users_id,\n                name,\n                ingrediente,\n                preparo,\n                description,\n                quantity,\n                status,\n                old_price,\n                price,\n                url_image\n            )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)\n            RETURNING id\n \n        ";
    data.price = data.price.replace(/\D/g, "");
    var values = [data.category_id, data.users_id, data.name, data.ingrediente, data.preparo, data.description, data.quantity, data.status, data.old_price || data.price, data.price, data.url_image];

    try {
      return BancodeDandos.query(query, values);
    } catch (error) {
      console.log(error);
    }
  },
  find: function find(id) {
    return BancodeDandos.query("\n            SELECT * FROM products WHERE id = $1\n        ", [id]);
  },
  update: function update(data) {
    var query = "\n            UPDATE products SET \n\n                category_id = ($1),\n                users_id = ($2),\n                name = ($3),\n                ingrediente = ($4),\n                preparo = ($5),\n                description = ($6),\n                quantity = ($7),\n                status = ($8),\n                old_price = ($9),\n                price = ($10),\n                url_image  = ($11)\n\n             WHERE   id =  $12\n             \n        ";
    data.price = data.price.replace(/\D/g, "");
    var values = [data.category_id, data.users_id, data.name, data.ingrediente, data.preparo, data.description, data.quantity, data.status, data.old_price || data.price, data.price, data.url_image, data.id];

    try {
      return BancodeDandos.query(query, values);
    } catch (error) {
      console.log(error);
    }
  },
  search: function search(params) {
    var filter = params.filter,
        category = params.category;
    var query = "",
        filterQuery = "WHERE";

    if (category) {
      filterQuery = "".concat(filterQuery, "\n              products.category_id = ").concat(category, "\n              AND\n              ");
    }

    filterQuery = "".concat(filterQuery, "\n            products.name ILIKE '%").concat(filter, "%'\n            OR products.description ILIKE '%").concat(filter, "%'\n            ");
    query = "\n              SELECT products.*,\n              categories.name   AS category_name\n              FROM products \n              LEFT JOIN categories ON(categories.id = products.category_id)\n              ".concat(filterQuery, "\n          \n            ");
    return BancodeDandos.query(query);
  },
  "delete": function _delete(id) {
    return BancodeDandos.query(" DELETE FROM products WHERE id = $1", [id]);
  },
  files: function files(id) {
    return BancodeDandos.query("\n            SELECT * FROM files WHERE product_id = $1\n        \n        ", [id]);
  }
};