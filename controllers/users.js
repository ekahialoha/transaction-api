const db = require('../models');

const fetchUser = require('../helpers/fetch_user');
const resJson = require('../helpers/res_json');
const validateAuthorization = require('../helpers/validate_authorization')

module.exports = {
  Users: {
    findAll: (req, res) => {

      db.User.findAll()
        .then(users => resJson(res, users))
        .catch(error => resJson(res, error, 500));
    },

    create: (req, res) => {
      const user = req.body.user;
      const role = validateAuthorization(req.user) ? user.role : null;

      db.User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role !== null ? user.role : 0
      })
        .then(result => resJson(res, result))
        .catch(error => resJson(res, error, 500));
    },

    findOne: (req, res) => {
      const user = fetchUser(req.params.id);

      user.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if(!validateAuthorization(req.user, result.id)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        resJson(res, result, 200);
      });
    },

    delete: (req, res) => {
      const user = fetchUser(req.params.id);

      user.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if(!validateAuthorization(req.user)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.destroy()
          .then(() => {
            resJson(res, {
              deleted: true
            });
          })
          .catch(error => resJson(res, error, 500));
      });
    },

    update: (req, res) => {
      const user = fetchUser(req.params.id);

      user.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if(!validateAuthorization(req.user, result.id)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.update(req.body.user)
          .then(updated => {
            resJson(res, {
              updated: true,
              data: updated
            });
          })
          .catch(error => resJson(res, 'Unprocessable Entity', 422));
      });
    }
  }
};
