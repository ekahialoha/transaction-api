const db = require('../models');
const dotEnv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const fetchUser = require('../helpers/fetch_user');
const resJson = require('../helpers/res_json');

module.exports = {
  Sessions: {
    create: (req, res) => {
      const session = req.body.session;
      const user = fetchUser(session.email, 'email');

      user.then(result => {
        if (result === null) {
          return resJson(res, result, 401, 'Bad Credentials');
        }

        result.validatePassword(session.password)
        .then(passwordCheck => {
          if (!passwordCheck) {
            return resJson(res, null, 401, 'Bad Credentials');
          }

          const response = {
            user: result.toJSON()
          };

          jwt.sign({ userId: result.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.SECRET_KEY_EXPIRES
          },(error, token) => {
            response.token = token;
            resJson(res, {
              successful: true,
              data: response
            });
          });
        });
      });
    },

    destroy: (req, res) => {

    }
  }
};
