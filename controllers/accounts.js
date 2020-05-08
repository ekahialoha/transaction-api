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
        .then(result => result.User.toJSON())
        .then(accounts => resJson(res, accounts))
        .catch(error => resJson(res, error, 500));
    },

    create: (req, res) => {
      const account = req.body.account;

      if (!validateAuthorization(req.user)) {
        return resJson(res, 'Bad Credentials', 401);
      }

      db.Account.create({
        name: account.name,
        userId: req.user.id
      })
        .then(result => resJson(res, result))
        .catch(error => resJson(res, error, 500));
    }
  }
};
