// ===================================
// Application Dependencies/Includes
// ===================================
const express = require('express');
const router = express.Router();

// ========================
// Setup routes for /api
// ========================
router.get('/user', (req, res) => {
  res.send('/users GET');
  });
router.post('/user', (req, res) => {
  res.send('/user POST');
});

module.exports = router;
