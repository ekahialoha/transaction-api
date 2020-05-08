// ===================================
// Application Dependencies/Includes
// ===================================
const dotEnv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../models');
const controllers = require('../controllers');
const middleware = require('../middleware');
const cors = require('cors');

console.log(middleware);
// ============================
// CORS - set allowed Origins
// ============================
let whitelist = process.env.CORS_WHITELIST;
if (!whitelist.isArray) {
  whitelist = whitelist.split(',');
}
router.use(cors({
  origin: (origin, callback) => {
    if (origin && !whitelist.includes(origin)) {
      const message = "The CORS policy for this origin doesn't allow access from the particular origin.";
      return callback(message, false);
    }
    return callback(null, true);
  }
}));
// router.use(middleware.forceHeaders);

// =================================
// Setup route for POST /api/users
// =================================
router.post('/users', controllers.Users.create);

// =================================
// Setup routes for /api/sessions
// =================================
router.post('/sessions', controllers.Sessions.create);
router.delete('/sesions', controllers.Sessions.destroy);

router.use(middleware.checkValidToken);

// =============================
// Setup routes for /api/users
// Except POST
// =============================
router.get('/users', controllers.Users.findAll);
router.get('/users/:id', controllers.Users.findOne);
router.delete('/users/:id', controllers.Users.delete);
router.put('/users/:id', controllers.Users.update);

// ==================================
// Setup routes for /api/accounts
// ==================================
router.get('/accounts', controllers.Accounts.findAll);
router.post('/accounts', controllers.Accounts.create);

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
