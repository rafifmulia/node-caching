const redis = require('redis');
// const utils = require('util');

const { REDIS_HOST, REDIS_PORT, REDIS_UNAME, REDIS_PASWD } = process.env;

let url = '';
if (REDIS_PASWD) {
  url = `redis://${REDIS_UNAME}:${REDIS_PASWD}@${REDIS_HOST}:${REDIS_PORT}`;
} else {
  url = `redis://${REDIS_HOST}:${REDIS_PORT}`;
}

const client = redis.createClient({
  url,
});

// const redisConn = utils.promisify(client).bind(client);
(async () => {
  const conn = await client.connect();
})();

module.exports = client;