const resJson = require('../helpers/res_json');

const forceHeaders = (req, res, next) => {
  const headers = req.headers;

  if (
      headers['content-type'] !== 'application/json'
      || headers['accept'] !== 'application/json'
      /*|| headers['authorization'] === undefined*/
    ) {
    return resJson(res, null, 406, 'Not Acceptable');
  }
  next();
};

module.exports = {
  forceHeaders: forceHeaders
};
