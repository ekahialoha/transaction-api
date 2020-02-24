const db = require('../models');

module.exports = {
  Users: {
    findAll: (req, res) => {
      db.User.findAll().then(users => res.json(users)).catch(error => res.json(error));
    },

    create: (req, res) => {
      db.User.create({
        name: req.body.user.name,
        email: req.body.user.email,
        password: req.body.user.password
      }).then(user => res.json(user)).catch(error => res.json(error));
    },

    findOne: (req, res) => {
      db.User.findOne({
        where: {
          id: req.params.id
        }
      }).then(user => res.json(user)).catch(error => res.json(error));
    },

    delete: (req, res) => {
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ deleted: true })).catch(error => res.json(error));
    },

    update: (req, res) => {
      db.User.update(req.body.user, {
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ updated: true })).catch(error => res.json(error));
    }
  }
};
