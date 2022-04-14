const showRoutes = require('./shows');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', showRoutes);
 
  app.use('*', (req, res) => {
    res.status(400).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;