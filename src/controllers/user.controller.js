import UserModel from "../models/user.model.js";

export default class UserController {
  getRegistrationForm(req, res) {
    res.render("register")
  }

  getLogin(req, res) {
    res.render("login")
  }
}