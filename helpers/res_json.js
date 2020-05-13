const resJson = (res, content = null, status = 200) => {
  if (status > 399) {
    content = {
      error: (content === null ? 'Application Error' : content),
    };
  }
  res.status(status).json(content);
};

module.exports = resJson;
