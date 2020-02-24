const db = require('../models');

const fetchRegistry = require('../helpers/fetch_registry.js');
const resJson = require('../helpers/res_json.js');

module.exports = {
  Registries: {
    findAll: (req, res) => {
        db.Registry.findAll()
          .then(registries => resJson(res, registries))
          .catch(error => resJson(res, null, 500, error));
    },

    create: (req, res) => {
      const registry = req.body.registry;

      db.Registry.create({
        name: registry.name,
        userId: registry.userId,
        type: registry.type
      })
        .then(result => resJson(res, result))
        .catch(error => resJson(res, null, 500, error));
    },

    findOne: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        resJson(res, result, 200, 'Not Found');
      });
    },

    delete: (req, res) => {
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
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
      const registry = fetchRegistry(req.params.id);

      registry.then(result => {
        if (result === null) {
          return resJson(res, result, 404, 'Not Found');
        }

        result.update(req.body.registry)
          .then(updated => {
            resJson(res, {
                update: true,
                data: updated
            });
          })
          .catch(error => resJson(error));
      });
    }
  }
};
