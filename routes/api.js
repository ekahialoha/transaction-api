// ===================================
// Application Dependencies/Includes
// ===================================
const express = require('express');
const router = express.Router();
const db = require('../models');

// ========================
// Setup routes for /api
// ========================
router.get('/user', (req, res) => {
  db.User.findAll().then((users) => {
    console.log(users);
    res.send('/users GET');
  });
});

router.post('/user', (req, res) => {
  db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then((user) => {
    res.send(user);
  });
});

module.exports = router;
