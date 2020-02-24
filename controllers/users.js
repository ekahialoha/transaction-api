const db = require('../models');

const fetchUser = require('../helpers/fetch_user');
const resJson = require('../helpers/res_json');

module.exports = {
  Users: {
    findAll: (req, res) => {
      db.User.findAll()
        .then(users => resJson(res, users))
        .catch(error => resJson(res, null, 500, error));
    },

    create: (req, res) => {
      const user = req.body.user;

      db.User.create({
        name: user.name,
        email: user.email,
        password: user.password
      })
        .then(result => resJson(res, result))
        .catch(error => resJson(res, null, 500, error));
    },

    findOne: (req, res) => {
      const user = fetchUser(req.params.id);

      user.then(result => {
        resJson(res, result, 200, 'Not Found');
      });
    },

    delete: (req, res) => {
      const user = fetchUser(req.params.id);

      user.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found');
        }

        result.destroy()
          .then(() => {
            resJson(res, {
              deleted: true
            });
          })
          .catch(error => resJson(res, null, 500, error));
      });
    },

    update: (req, res) => {
      const user = fetchUser(req.params.id);

      user.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found');
        }

        result.update(req.body.user)
          .then(updated => {
            resJson(res, {
              updated: true,
              data: updated
            });
          })
          .catch(error => resJson(error));
      });
    }
  }
};
