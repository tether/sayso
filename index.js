/**
 * Dependencoes.
 */

const basic = require('basic-auth')


/**
 * This is a simple description.
 *
 * @api public
 */

module.exports = function (req, cb) {
  const {name, pass} = basic(req)
  cb(name, pass)
}
