class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong' } = err;

  res.status(statusCode).json({
    status: err.status || 'error',
    statusCode,
    message
  });
};

export { AppError, handleError };
