'use strict'

const config = require('../../config')
const { logger } = require('@vtfk/logger')

module.exports = file => {
  return new Promise((resolve, reject) => {
    const filePath = `../../${config.QUEUE_DIRECTORY_PATH}/${file}`
    logger('info', ['get-file-data', filePath])
    const data = require(filePath)
    if (data) {
      logger('info', ['get-file-data', data._id, 'data found', 'jobId', data.jobId, 'system', data.system])
      resolve(data)
    } else {
      const error = new Error('File not found')
      logger('error', ['get-file-data', 'error', error])
      reject(error)
    }
  })
}
