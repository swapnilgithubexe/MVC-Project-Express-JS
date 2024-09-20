import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationCheck from "./middlewares/validation.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import { uploadFile } from "./middlewares/fileupload.middleware.js";
import session from "express-session";

const server = express();

//session
server.use(session({
  secret: "TELLMEDOYOUBLEED",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },

}));

//parse form data
server.use(express.urlencoded({ extended: true }));

server.use(express.static("public"))

server.set("view engine", "ejs")
server.set("views", path.join(path.resolve(), "src", "views"))
server.use(ejsLayouts);

const productController = new ProductController();
const userController = new UserController();

server.get("/", productController.getProducts);
server.get('/new', productController.getAddForm)
server.get("/update/:id", productController.getUpdateProductView);

server.post("/", uploadFile.single("imageUrl"), validationCheck, productController.addNewProduct)

server.post("/update", productController.postUpdateProduct)

server.post("/delete/:id", productController.deleteProduct)

server.use(express.static("src/views"));

//Login
server.get("/login", userController.getLogin)

server.post("/login", userController.loginCheck)

//Register
server.get("/register", userController.getRegistrationForm)

server.post("/register", userController.postRegister);

server.listen(3400, () => {
  console.log("Server is listening on port number 3400.");

})