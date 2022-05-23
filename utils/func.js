class Func {
  static endResJson(res, code, json, opts = {}) {
    // if (opts.ETag) res.set('ETag', opts.ETag); // if response header ETag match with request header If-None-Match, will force 304 code with no content
    if (opts['x-cache-key']) res.set('x-cache-key', opts['x-cache-key']);
    return res.status(code).json(json);
  }
}

module.exports = Func;