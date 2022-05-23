// const { fromUnixTime, format: formatDate, id: idLocale, add: dateAdd } = require('date-fns');
const axios = require('axios');
const NodeCache = require('node-cache');
const CryptoJs = require('crypto-js');
const Func = require ('../utils/func');
const Constants = require('../utils/constants');

const mCache = new NodeCache({ checkperiod: Constants.cachePeriodS });

// https://stackoverflow.com/questions/24542959/how-does-a-etag-work-in-expressjs

class CacheController {
  static async interalCache(req, res) {
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
          return Func.endResJson(res, 304, {
            type: 'sc',
            msg: 'success get resource from cache',
            data,
          }, {
            ETag,
          });
        }
      }
      const getPosts = await axios({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
        responseType: 'json',
      });
      const newETag = CryptoJs.SHA256(now).toString(CryptoJs.enc.Hex);
      mCache.set(newETag, getPosts.data, Constants.cachePeriodS);
      return Func.endResJson(res, 200, {
        type: 'sc',
        msg: 'success get and cache resource',
        data: getPosts.data,
      }, {
        ETag: newETag,
      });
    } catch (e) {
      return res.status(500).json({
        type: 'err',
        msg: 'error: ' + e.message,
        data: getPosts,
      });
    }
  }

  static async clearInteralCache(req, res) {
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
        data: getPosts,
      });
    }
  }
}

module.exports = CacheController;