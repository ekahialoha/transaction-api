// ===================================
// Application Dependencies/Includes
// ===================================
const express = require('express');
const router = express.Router();
const db = require('../models');
const controllers = require('../controllers')

// =============================
// Setup routes for /api/users
// =============================
console.log(controllers);
router.get('/users', controllers.Users.findAll);

router.post('/users', controllers.Users.create);

router.get('/users/:id', controllers.Users.findOne);

router.delete('/users/:id', controllers.Users.delete);

router.put('/users/:id', controllers.Users.update);

// =========================================
// Setup reoutes for /api/authentications
// =========================================
router.post('/authentications', (req, res) => {
  db.User.findOne({
    where: {
      email: req.body.authentication.email
    }
  }).then(async user => {
    res.json(await user.validatePassword(req.body.authentication.password));
  }).catch(error => res.json(error))
});


// ==================================
// Setup routes for /api/registries
// ==================================
router.get('/registries', controllers.Registries.findAll);

router.post('/registries', controllers.Registries.create);

router.get('/registries/:id', controllers.Registries.findOne);

router.delete('/registries/:id', controllers.Registries.delete);

router.put('/registries/:id', controllers.Registries.update);

// =====================================
// Setup routes for /api/transactions
// =====================================
router.get('/transactions', controllers.Transactions.findAll);

router.post('/transactions', controllers.Transactions.create);

router.get('/transactions/:id', controllers.Transactions.findOne);

router.delete('/transactions/:id', controllers.Transactions.delete);

router.put('/transactions/:id', controllers.Transactions.update);

module.exports = router;
