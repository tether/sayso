
/**
 * Test dependencies.
 */

const test = require('tape')
const server = require('server-test')
const authorization = require('..')



test('get credentials from basic auth', assert => {
  assert.plan(2)
  server((req, res) => {
    const user = authorization(req)
    assert.equal(user.name, 'foo')
    assert.equal(user.pass, 'bar')
  }, {
    method: 'POST',
    headers: {
      'Authorization' : credentials('foo', 'bar')
    },
    form: {}
  })
})

/**
 * Create Basic Authorization headefr.
 *
 * @param {String} name
 * @param {String} pass
 * @api private
 */

function credentials (name, pass) {
  return 'Basic ' + new Buffer(`${name}:${pass}`).toString('base64')
}
