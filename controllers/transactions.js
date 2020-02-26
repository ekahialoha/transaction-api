const db = require('../models');

const fetchTransaction = require('../helpers/fetch_transaction');
const fetchRegistry = require('../helpers/fetch_registry');
const resJson = require('../helpers/res_json');
const validateAuthorization = require('../helpers/validate_authorization');

module.exports = {
  Transactions: {
    findAll: (req, res) => {
      db.Transaction.findAll()
        .then(transactions => resJson(res, transactions))
        .catch(error => resJson(res, error, 500));
    },

    create: (req, res) => {
      const transaction = req.body.transaction;

      const registry = fetchRegistry(transaction.registryId);

      registry.then(result => {
        if (result === null || !validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Unprocessable Entity', 422);
        }

        db.Transaction.create({
          description: transaction.description,
          userId: transaction.userId,
          registryId: transaction.registryId,
          type: transaction.type,
          value: transaction.value
        })
          .then(transaction => resJson(res, transaction))
          .catch(error => resJson(res, error, 422));
      });
    },

    findOne: (req, res) => {
      const transaction = fetchTransaction(req.params.id);

      transaction.then(result => {
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
      const transaction = fetchTransaction(req.params.id);

      transaction.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.destroy()
          .then(() => {
            resJson(res, {
              deleted: true
            });
          })
          .catch(error => resJson(res, errror, 500));
      });
    },

    update: (req, res) => {
      const transaction = fetchTransaction(req.params.id);

      transaction.then(result => {
        if (result === null) {
          return resJson(res, 'Not Found', 404);
        }

        if (!validateAuthorization(req.user, result.userId)) {
          return resJson(res, 'Bad Credentials', 401);
        }

        result.update(req.body.transaction)
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
