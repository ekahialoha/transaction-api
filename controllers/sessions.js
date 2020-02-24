const db = require('../models');

module.exports = {
  Sessions: {
    create: (req, res) => {
      db.User.findOne({
        where: {
          email: req.body.authentication.email
        }
      }).then(async user => {
        res.json(await user.validatePassword(req.body.authentication.password));
      }).catch(error => res.json(error))
    }
  }
};
