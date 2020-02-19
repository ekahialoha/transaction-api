// ==========================
// Application Dependencies
// ==========================
const dotEnv = require('dotenv').config();
const express = require('express');
const sequelize = require('sequelize');

// ====================
// Simple application
// ====================
const app = express();
console.log(dotEnv);
const port = dotEnv.parsed.PORT;

// =====================
// Database Connection
// =====================
const dbConnection = new sequelize();


app.get('/', (req, res) => res.send('Hello :)'));
app.listen(port, () => console.log(`APPLICATION STATUS: Listening on port ${port}`))
