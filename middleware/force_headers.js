const resJson = require('../helpers/res_json');

const forceHeaders = (req, res, next) => {
  const approved = ['*/*', 'application/json'];
    if (!approved.includes(req.headers['accept']) ) {
    return resJson(res, null, 406, 'Not Acceptable');
  }
  next();
};

module.exports = {
  forceHeaders: forceHeaders
};
