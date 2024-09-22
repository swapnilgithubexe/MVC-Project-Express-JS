//Core Imports
import express from "express";
import session from "express-session";
import path from "path";
import ejsLayouts from "express-ejs-layouts";

//Controllers
import UserController from "./src/controllers/user.controller.js";
import ProductController from "./src/controllers/product.controller.js";

//Middlewares
import { isAuth } from "./src/middlewares/auth.middleware.js";
import { uploadFile } from "./src/middlewares/fileupload.middleware.js";
import validationCheck from "./src/middlewares/validation.middleware.js";



const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


//session
server.use(session({
  secret: "TELLMEDOYOUBLEED",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },

}));


server.use(express.static("public"))

server.set("view engine", "ejs")
server.set("views", path.join(path.resolve(), "src", "views"))
server.use(ejsLayouts);

const productController = new ProductController();
const userController = new UserController();

//Login
server.get("/login", userController.getLogin)

server.post("/login", (req, res) => userController.loginCheck(req, res));

//Register
server.get("/register", userController.getRegistrationForm)

server.post("/register", userController.postRegister);

server.get("/logout", userController.logout);

//other routes

server.get("/", isAuth, productController.getProducts);
server.get('/new', isAuth, productController.getAddForm)
server.get("/update/:id", isAuth, productController.getUpdateProductView);

server.post("/", isAuth, uploadFile.single("imageUrl"), validationCheck, productController.addNewProduct)

server.post("/update", isAuth, productController.postUpdateProduct)

server.post("/delete/:id", isAuth, productController.deleteProduct)

server.use(express.static("src/views"));



server.listen(3400, () => {
  console.log("Server is listening on port number 3400.");

})