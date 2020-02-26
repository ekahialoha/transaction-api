const resJson = (res, result = null, status = 200) => {
  if (status > 399) {
    result = {
      error: (result === null ? 'Application Error' : result)
    };
  }
  res.status(status).json(result);
};

module.exports = resJson;
