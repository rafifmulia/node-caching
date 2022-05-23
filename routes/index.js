const CacheController = require('../controllers/CacheController');

const routes = (app) => {
  app.get('/internal_cache', CacheController.internalCache);
  app.delete('/internal_cache', CacheController.clearInternalCache);
  app.get('/redis_cache', CacheController.redisCache);
};

module.exports = routes;