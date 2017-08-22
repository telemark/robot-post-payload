'use strict'

const axios = require('axios')
const generateSystemJwt = require('../generate-system-jwt')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['post-data', data._id, 'start'])
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()

    logger('info', ['post-data', data._id, 'url', data.content.url])

    try {
      const result = await axios.post(data.content.url, data.content.payload)
      logger('info', ['post-data', data._id, 'finished'])
      data.response = result.data
    } catch (error) {
      logger('error', ['post-data', data._id, error])
      data.retry = true
      data.errors.push(error)
    }
    resolve(data)
  })
}
