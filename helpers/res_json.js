const resJson = (res, result, status = 200, errorMessage = 'Application Error') => {
  if (result === null) {
    status = status === 200 ? 404 : status;
    result = {
      error: errorMessage
    };
  }
  res.status(status).json(result);
};

module.exports = resJson;
