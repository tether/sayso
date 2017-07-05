
/**
 * Test dependencies.
 */

const test = require('tape')
const request = require('request')
const authorization = require('..')
const http = require('http')


test('get credentials from basic auth', assert => {
  assert.plan(2)
  server((req, res) => {
    authorization(req, (user, pass) => {
      assert.equal(user, 'foo')
      assert.equal(pass, 'bar')
    })
  }, 'foo', 'bar')
})


/**
 * Create HTTP server.
 *
 * @param {Function} cb
 * @param {String} method
 * @param {String} params
 * @param {Object} data
 * @api private
 */

function server (cb, user, password) {
  const credentials = 'Basic ' + new Buffer(`${user}:${password}`).toString('base64')
  const server = http.createServer((req, res) => {
    cb(req, res)
    res.end()
  }).listen(() => {
    const port = server.address().port
    const sock = net.connect(port)
    request.post({
      url: `http://localhost:${port}`,
      headers: {
        'Authorization' : credentials
      },
      form: {}
    }, () => {
      sock.end();
      server.close();
    })
  })
}
