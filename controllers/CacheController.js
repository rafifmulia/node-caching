// const { fromUnixTime, format: formatDate, id: idLocale, add: dateAdd } = require('date-fns');
const axios = require('axios');
const NodeCache = require('node-cache');
const CryptoJs = require('crypto-js');
const Func = require ('../utils/func');
const Constants = require('../utils/constants');
const redisClient = require('../library/redisClient');

const mCache = new NodeCache({ checkperiod: Constants.cachePeriodS });

const SECRET_KEY = process.env.ETagSKey;

class CacheController {
  static async internalCache(req, res) {
    const now = new Date().getTime();
    try {
      // try new lib alternative moment
      // console.log(fromUnixTime(now));
      // console.log(idLocale); // undefined
      // console.log(formatDate(now, 'yyyy-MMMM-eeee hh:mm:ss', { weekStartsOn: 1, locale: idLocale }));
      const ETag = req.headers['if-none-match'];
      if (ETag) {
        const data = mCache.get(ETag);
        if (data) {
          return Func.endResJson(res, 200, {
            type: 'sc',
            msg: 'success get resource from cache',
            data,
          }, {
            'x-cache-key': ETag,
          });
        }
      }
      const getPosts = await axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        responseType: 'json',
      });
      const newETag = CryptoJs.SHA256('' + now).toString(CryptoJs.enc.Hex);
      mCache.set(newETag, getPosts.data, Constants.cachePeriodS);
      return Func.endResJson(res, 200, {
        type: 'sc',
        msg: 'success get and cache resource',
        data: getPosts.data,
      }, {
        'x-cache-key': newETag,
      });
    } catch (e) {
      return res.status(500).json({
        type: 'err',
        msg: 'error: ' + e.message,
      });
    }
  }
  static async clearInternalCache(req, res) {
    const now = new Date().getTime();
    try {
      mCache.flushAll();
      return Func.endResJson(res, 200, {
        type: 'sc',
        msg: 'success delete resource',
      });
    } catch (e) {
      return res.status(500).json({
        type: 'err',
        msg: 'error: ' + e.message,
      });
    }
  }

  static async redisCache(req, res) {
    const now = new Date().getTime();
    try {
      const ETag = req.headers['if-none-match'];
      if (ETag) {
        const data = await redisClient.get(ETag);
        if (data) {
          return Func.endResJson(res, 200, {
            type: 'sc',
            msg: 'success get resource from cache',
            data: JSON.parse(data),
          }, {
            'x-cache-key': ETag,
          });
        }
      }
      const getPosts = await axios({
        method: 'GET',
        url: 'https://disease.sh/v3/covid-19/all',
        responseType: 'json',
      });
      const newETag = CryptoJs.AES.encrypt('' + now, SECRET_KEY).toString();
      redisClient.set(newETag, JSON.stringify(getPosts.data));
      return Func.endResJson(res, 200, {
        type: 'sc',
        msg: 'success get and cache resource',
        data: getPosts.data,
      }, {
        'x-cache-key': newETag,
      });
    } catch (e) {
      return res.status(500).json({
        type: 'err',
        msg: 'error: ' + e.message,
      });
    }
  }
}

module.exports = CacheController;