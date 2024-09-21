import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationCheck from "./middlewares/validation.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import { uploadFile } from "./middlewares/fileupload.middleware.js";
import session from "express-session";
import { isAuth } from "./middlewares/auth.middleware.js";


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
// server.use((req, res, next) => {
//   console.log("Session details:", req.session);
//   next();
// });

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