export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static addUser(name, email, password) {
    let newUser = new UserModel(Users.length + 1, name, email, password);
    Users.push(newUser);
  }

  static loginHandler(email, password) {
    let isValidUser = Users.find((user) => user.email == email && user.password == password);
    return isValidUser;

  }
}
var Users = [];