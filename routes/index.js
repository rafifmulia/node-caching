const CacheController = require('../controllers/CacheController');

const routes = (app) => {
  app.get('/internal_cache', CacheController.interalCache);
  app.delete('/internal_cache', CacheController.clearInteralCache);
};

module.exports = routes;