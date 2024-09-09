import path from "path";
import ProductModel from "../models/product.model.js";
import { log } from "console";

export default class ProductController {
  getProducts(req, res) {
    let products = ProductModel.get()

    return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"))
  }
}

