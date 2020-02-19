// ########################
// Setup routes for /api
// ########################
module.exports = (app, db) => {
  app.use('/api', (req, res) => {
    app.get('/', (req, res) => {
      res.send('Hello :)');
    });
  });
};
