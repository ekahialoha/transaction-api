const db = require('../models');

module.exports = {
  Transactions: {
    findAll: (req, res) => {
      db.Transaction.findAll()
        .then(transactions => res.json(transactions))
        .catch(error => res.json(error));
    },

    create: (req, res) => {
      db.Transaction.create({
        description: req.body.transaction.description,
        userId: req.body.transaction.userId,
        registryId: req.body.transaction.registryId,
        type: req.body.transaction.type,
        value: req.body.transaction.value
      }).then(transaction => res.json(transaction)).catch(error => res.json(error));
    },

    findOne: (req, res) => {
      db.Transaction.findOne({
        where: {
          id: req.params.id
        }
      }).then(transaction => res.json(transaction)).catch(error => res.json(error));
    },

    delete: (req, res) => {
      db.Transaction.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ deleted: true })).catch(error => res.json(error));
    },

    update: (req, res) => {
      db.Transaction.update(req.body.transaction, {
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ updated: true })).catch(error => res.json(error));
    }
  }
};
