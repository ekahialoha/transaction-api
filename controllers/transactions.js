const db = require('../models');

const fetchTransaction = require('../helpers/fetch_transaction');
const resJson = require('../helpers/res_json');

module.exports = {
  Transactions: {
    findAll: (req, res) => {
      db.Transaction.findAll()
        .then(transactions => resJson(res, transactions))
        .catch(error => resJson(res, null, 500, error));
    },

    create: (req, res) => {
      const transaction = req.body.transaction;

      db.Transaction.create({
        description: transaction.description,
        userId: transaction.userId,
        registryId: transaction.registryId,
        type: transaction.type,
        value: transaction.value
      })
        .then(transaction => resJson(res, transaction))
        .catch(error => resJson(res, null, 422, error));
    },

    findOne: (req, res) => {
      const transaction = fetchTransaction(req.params.id);

      transaction.then(result => {
        resJson(res, result, 200, 'Not Found');
      });
    },

    delete: (req, res) => {
      const transaction = fetchTransaction(req.params.id);

      transaction.then(result => {
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
      const transaction = fetchTransaction(req.params.id);

      transaction.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found');
        }

        result.update(req.body.transaction)
          .then(updated => {
            resJson(res, {
              updated: true,
              data: updated
            });
          })
          .catch(error => resJson(res, null, 422, error));
      });
    }
  }
};
