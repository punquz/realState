const ErrorResponse = require('../util/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id:${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose Duplication Error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered!';
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation Error
  if (err.name === 'ValidationError') {
    const messgae = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(messgae, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error!!'
  });
};

module.exports = errorHandler;
