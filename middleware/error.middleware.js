const errorsMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = "This Data not found";
    error = new Error(message);
    error.statusCode = 404;
  }
  if (err.code === 11000) {
    const message = "This Data Already exsists";
    error = new Error(message);
    error.statusCode = 409;
  }
  if (err.name === "ValidationError") {
    const message =
      "There is a missing value or a wrong format please check it again";
    error = new Error(message);
    error.statusCode = 400;
  }
  if (err.name === "FileTypeError") {
    error = new Error(err.message);
    error.statusCode = err.statusCode;
  }
  if (err.name === "JsonWebTokenError") {
    error = new Error(err.message);
    error.statusCode = 401;
  }
  if (err.name === "TokenExpiredError") {
    const error = new Error("Token expired");
    error.statusCode = 401;
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
  res.status(error.statusCode || 500).json({
    success: false,
    massege: error.message || "Server Error",
  });
};
export default errorsMiddleware;
