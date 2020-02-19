// ===================================
// Application Dependencies/Includes
// ===================================
const dotEnv = require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api.js');
const db = require('./models');

// ====================
// Simple application
// ====================
const app = express();
const port = process.env.PORT || 3000;

// ============
// Middleware
// ============
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// ========
// Routes
// ========
app.use('/api', apiRoutes);

// ==================
// Start up server
// ==================
app.listen(port, () => console.log(`Node Server: Listening on port ${port}`));
