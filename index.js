import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationCheck from "./middlewares/validation.middleware.js";

const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));

server.set("view engine", "ejs")
server.set("views", path.join(path.resolve(), "src", "views"))
server.use(ejsLayouts);

const productController = new ProductController();

server.get("/", productController.getProducts);
server.get('/new', productController.getAddForm)
server.get("/update/:id", productController.getUpdateProductView);

server.post("/", validationCheck, productController.addNewProduct)

server.post("/update", productController.postUpdateProduct)

server.use(express.static("src/views"));

server.listen(3400, () => {
  console.log("Server is listening on port number 3400.");

})