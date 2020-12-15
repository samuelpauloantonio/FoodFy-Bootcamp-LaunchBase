const Product = require("../models/products");
const { formatPrice } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    let results,
      params = {};

    const { filter, category } = req.query;

    if (!filter) return res.redirect("/");

    params.filter = filter;

    if (category) {
      params.category = category;
    }

    results = await Product.search(params);

    async function getImage(product_id) {
      let results = await Product.files(product_id);
      const files = results.rows.map(
        (file) =>
          `${req.protocol}://${req.headers.host}${file.path.replace(
            "public",
            ""
          )}`
      );

      return files[0];
    }

    const productPromise = results.rows.map(async (product) => {
      product.img = await getImage(product.id);
      product.oldPrice = formatPrice(product.old_price);
      product.price = formatPrice(product.price);

      return product;
    });

    const products = await Promise.all(productPromise);

    const search = {
      term: req.query.filter,
      total: products.length,
    };

    const categories = products
      .map((product) => ({
        id: product.category_id,
        name: product.category_name,
      }))
      .reduce((categoryFiltered, category) => {
        const found = categoryFiltered.some((cat) => cat.id == category.id);

        if (!found) categoryFiltered.push(category);

        return categoryFiltered;
      }, []);

      console.log(categories)

    return res.render("search/index", { products, search, categories });
  },
};
