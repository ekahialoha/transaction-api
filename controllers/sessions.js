const db = require('../models');

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
          resJson(res, {
            successful: true,
            data: result
          });
        });
      });
    }
  }
};
