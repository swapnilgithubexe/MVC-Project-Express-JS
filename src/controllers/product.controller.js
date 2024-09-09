import path from "path";

export default class ProductController {
  getProducts(req, res) {
    return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"))
  }
}

