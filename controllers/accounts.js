const db = require('../models');

const fetchAccount = require('../helpers/fetch_account');
const resJson = require('../helpers/res_json');
const validateAuthorization = require('../helpers/validate_authorization');

module.exports = {
  Accounts: {
    findAll: (req, res) => {
      const options = { where: {} };
      if (req.user.isAdmin && req.query.useAdmin !== undefined && req.query.useAdmin === 'true') {
        if (req.query.userId !== undefined) {
          options.where.userId = req.query.userId;
        }
      } else {
        options.where.userId = req.user.id;
      }

      db.Account.findAll(options)
        .then((accounts) => resJson(res, accounts))
        .catch((error) => resJson(res, error, 500));
    },

    create: (req, res) => {
      const { account } = req.body;

      db.Account.create({
        name: account.name,
        userId: req.user.id,
      })
        .then((result) => resJson(res, result))
        .catch((error) => resJson(res, error, 500));
    },

    findOne: (req, res) => {
      const account = fetchAccount(req.params.id);

      account.then((result) => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }
        resJson(res, result);
      });
    },

    delete: (req, res) => {
      const account = fetchAccount(req.params.id);

      account.then((result) => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.destroy()
          .then(() => {
            resJson(res, {
              deleted: true,
            });
          })
          .catch((error) => resJson(res, error, 500));
      });
    },

    update: (req, res) => {
      const account = fetchAccount(req.params.id);

      account.then((result) => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.update(req.body.account)
          .then((updated) => {
            resJson(res, {
              update: true,
              data: updated,
            });
          })
          .catch((error) => resJson(res, 'Unprocessable Entity', 422));
      });
    },
  },
};
