"use strict";

var Product = require("../models/products");

var _require = require("../../lib/utils"),
    formatPrice = _require.formatPrice;

module.exports = {
  index: function index(req, res) {
    var results, params, _req$query, filter, category, getImage, productPromise, products, search, categories;

    return regeneratorRuntime.async(function index$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            getImage = function _ref(product_id) {
              var results, files;
              return regeneratorRuntime.async(function getImage$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(Product.files(product_id));

                    case 2:
                      results = _context.sent;
                      files = results.rows.map(function (file) {
                        return "".concat(req.protocol, "://").concat(req.headers.host).concat(file.path.replace("public", ""));
                      });
                      return _context.abrupt("return", files[0]);

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            params = {};
            _req$query = req.query, filter = _req$query.filter, category = _req$query.category;

            if (filter) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.redirect("/"));

          case 5:
            params.filter = filter;

            if (category) {
              params.category = category;
            }

            _context3.next = 9;
            return regeneratorRuntime.awrap(Product.search(params));

          case 9:
            results = _context3.sent;
            productPromise = results.rows.map(function _callee(product) {
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(getImage(product.id));

                    case 2:
                      product.img = _context2.sent;
                      product.oldPrice = formatPrice(product.old_price);
                      product.price = formatPrice(product.price);
                      return _context2.abrupt("return", product);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
            _context3.next = 13;
            return regeneratorRuntime.awrap(Promise.all(productPromise));

          case 13:
            products = _context3.sent;
            search = {
              term: req.query.filter,
              total: products.length
            };
            categories = products.map(function (product) {
              return {
                id: product.category_id,
                name: product.category_name
              };
            }).reduce(function (categoryFiltered, category) {
              var found = categoryFiltered.some(function (cat) {
                return cat.id == category.id;
              });
              if (!found) categoryFiltered.push(category);
              return categoryFiltered;
            }, []);
            console.log(categories);
            return _context3.abrupt("return", res.render("search/index", {
              products: products,
              search: search,
              categories: categories
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};