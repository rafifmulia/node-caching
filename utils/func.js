class Func {
  static endResJson(res, code, json, opts = {}) {
    if (opts.ETag) res.set('ETag', opts.ETag);
    return res.status(code).json(json);
  }
}

module.exports = Func;