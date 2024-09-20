import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  getRegistrationForm(req, res) {
    res.render("register")
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null })
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login", { errorMessage: null })
  }

  loginCheck(req, res) {
    const { email, password } = req.body;
    const user = UserModel.loginHandler(email, password)

    if (!user) {
      return res.render("login", { errorMessage: "Invalid Credentials!" })
    } else {
      let products = ProductModel.get();

      return res.render("products", { products: products });
    }
  }


}