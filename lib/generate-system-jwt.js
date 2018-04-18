const jwt = require('jsonwebtoken')
const config = require('../config')
const pkg = require('../package.json')

module.exports = () => {
  const payload = {
    system: pkg.name,
    version: pkg.version
  }

  const options = {
    expiresIn: '1m',
    issuer: 'https://auth.t-fk.no'
  }

  return `Bearer ${jwt.sign(payload, config.JWT_SECRET, options)}`
}
