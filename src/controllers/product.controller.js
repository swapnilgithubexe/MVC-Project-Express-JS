import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get();

    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  addNewProduct(req, res) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.get();
    res.render("products", { products: products });
  }

  getUpdateProductView(req, res, next) {
    const id = parseInt(req.params.id, 10);

    const productFound = ProductModel.getById(id);

    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.status(404).send("Product not found!");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

  deleteProduct(req, res) {
    const productId = req.params.id;
    console.log(productId)
    ProductModel.delete(productId)
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

}
