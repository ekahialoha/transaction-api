const resJson = require('../helpers/res_json');

const forceHeaders = (req, res, next) => {
  if (req.headers['accept'] !== 'application/json') {
    return resJson(res, null, 406, 'Not Acceptable');
  }
  next();
};

module.exports = {
  forceHeaders: forceHeaders
};
