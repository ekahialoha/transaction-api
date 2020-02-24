const db = require('../models');

module.exports = {
  Registries: {
    findAll: (req, res) => {
      db.Registry.findAll().then(registries => res.json(registries)).catch(error => res.json(error));
    },

    create: (req, res) => {
      db.Registry.create({
        name: req.body.registry.name,
        userId: req.body.registry.userId,
        type: req.body.registry.type
      }).then(registry => res.json(registry)).catch(error => res.json(error));
    },

    findOne: (req, res) => {
      db.Registry.findOne({
        where: {
          id: req.params.id
        }
      }).then(registry => res.json(registry)).catch(error => res.json(error));
    },

    delete: (req, res) => {
      db.Registry.destroy({
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ deleted:true })).catch(error => res.json(error));
    },

    update: (req, res) => {
      db.Registry.update(req.body.registry, {
        where: {
          id: req.params.id
        }
      }).then(() => res.json({ update: true })).catch(error => res.json(error));
    }
  }
};
