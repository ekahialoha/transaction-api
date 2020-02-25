const db = require('../models');
const jwt = require('jsonwebtoken');

const resJson = require('../helpers/res_json');

module.exports = {
  checkValidToken: async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ') : [];

    if (token[0] !== 'Bearer' || token[1] === undefined) {
      resJson(res, null, 401, 'Bad Credentials');
      return;
    }

    jwt.verify(token[1], process.env.SECRET_KEY, (error, decoded) => {
      if (error || !decoded) {
        resJson(res, null, 401, 'Bad Credentials');
        return;
      }

      const token = db.User.findByPk(decoded.userId);

      token.then(result => {
        req.user = JSON.stringify(result);
        next();
      });
    });
  }
};
