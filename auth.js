function Auth(req, res, next) {
  console.log("Authentating...");

  next();
}
export default Auth;
