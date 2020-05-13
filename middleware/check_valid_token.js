const db = require('../models');
const jwt = require('jsonwebtoken');

const fetchUser = require('../helpers/fetch_user');
const resJson = require('../helpers/res_json');

module.exports = {
  checkValidToken: async (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ') : [];

    if (token[0] !== 'Bearer' || token[1] === undefined) {
      return resJson(res, null, 401, 'Bad Credentials');
    }

   try {
      const decoded = await jwt.verify(token[1], process.env.SECRET_KEY);
      const user = await fetchUser(decoded.user.id);
      req.user = user.toJSON();
      next();
    } catch (error) {
      return resJson(res, error, 401, 'Bad Credentials');
    }
  }
};
