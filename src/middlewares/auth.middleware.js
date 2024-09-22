export const isAuth = (req, res, next) => {
  //once logged in userEmail has been sent by the session object.
  if (req.session.userEmail) {
    next();
  } else {
    res.redirect("/login");
  }
}