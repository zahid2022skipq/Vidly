function logger(req, res, next) {
  console.log("Logging...");

  next();
}

export default logger;
