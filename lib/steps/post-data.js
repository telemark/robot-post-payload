const axios = require('axios')
const generateSystemJwt = require('../generate-system-jwt')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, 'start'])
    axios.defaults.headers.common['Authorization'] = generateSystemJwt()

    logger('info', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, 'url', data.content.url, 'method', data.content.method])

    try {
      const method = data.content.method || 'POST'
      const result = method === 'PUT' ? await axios.put(data.content.url, data.content.payload) : await axios.post(data.content.url, data.content.payload)
      logger('info', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, 'finished'])
      data.response = result.data
    } catch (error) {
      logger('error', ['post-data', data._id, 'jobId', data.jobId, 'system', data.system, error])
      data.retry = true
      data.errors.push(error)
    }
    resolve(data)
  })
}
