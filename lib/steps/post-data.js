const axios = require('axios')
const generateSystemJwt = require('../generate-system-jwt')
const config = require('../../config')
const { logger } = require('@vtfk/logger')

module.exports = async data => {
  logger('info', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, 'start'])
  if (config.JWT_URL_1 && data.content.url.includes(config.JWT_URL_1)) {
    axios.defaults.headers.common.Authorization = generateSystemJwt(config.JWT_SECRET_1)
  } else {
    axios.defaults.headers.common.Authorization = generateSystemJwt(config.JWT_SECRET)
  }

  logger('info', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, 'url', data.content.url, 'method', data.content.method])

  try {
    const method = data.content.method || 'POST'
    const options = {
      url: data.content.url,
      method: method.toLowerCase(),
      data: data.content.payload
    }
    if (config.AUTH_USERNAME && config.AUTH_PASSWORD) {
      options.auth = {
        username: config.AUTH_USERNAME,
        password: config.AUTH_PASSWORD
      }
    }
    const result = await axios(options)
    logger('info', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, 'finished'])
    data.response = result.data
  } catch (error) {
    logger('error', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, error.response.data])
    data.retry = true
    if (data.content.error) {
      data.content.error.push(error.response.data)
    } else {
      data.content.error = [error.response.data]
    }
    data.errors.push(error)
  }
  return data
}
