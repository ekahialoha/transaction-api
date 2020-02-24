const db = require('../models');

module.exports = {
  Users: {
    findAllUsers: (req, res) => {
      db.User.findAll().then(users => res.json(users)).catch(error => res.json(error));
    },

    createUser: (req, res) => {
      db.User.create({
        name: req.body.user.name,
        email: req.body.user.email,
        password: req.body.user.password
      }).then(user => res.json(user)).catch(error => res.json(error));
    },

    findOneUser: (req, res) => {
      db.User.findOne({
        where: {
          id: req.params.id
        }
      }).then(user => res.json(user)).catch(error => res.json(error));
    },

    deleteUser: (req, res) => {
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ deleted: true })).catch(error => res.json(error));
    },

    updateUser: (req, res) => {
      db.User.update(req.body.user, {
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ updated: true })).catch(error => res.json(error));
    }
  }
};
