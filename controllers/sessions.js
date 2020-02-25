const db = require('../models');
const dotEnv = require('dotenv').config();
const jwt = require('jsonwebtoken');

const fetchUser = require('../helpers/fetch_user');
const resJson = require('../helpers/res_json');

module.exports = {
  Sessions: {
    create: (req, res) => {
      const user = fetchUser(req.body.session.email, 'email');

      user.then(result => {
        if (result === null) {
          return resJson(res, result, 401, 'Bad Credentials');
        }

        result.validatePassword(req.body.session.password)
        .then(passwordCheck => {
          if (!passwordCheck) {
            return resJson(res, null, 401, 'Bad Credentials');
          }

          jwt.sign({userId: result.id}, process.env.SECRET_KEY, (err, token) => {
            res.header('Authorization', `Bearer ${token}`);
            resJson(res, {
              successful: true,
              data: result
            });
          });
        });
      });
    },

    destroy: (req, res) => {

    }
  }
};
