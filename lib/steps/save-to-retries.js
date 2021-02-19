'use strict'

const { logger } = require('@vtfk/logger')
const saveFile = require('../save-file')
const config = require('../../config')

const shouldRetry = data => {
  if (data.retryCount) {
    return data.retryCount < config.RETRY_MAX_COUNT
  } else return true
}

module.exports = async data => {
  logger('info', ['save-to-retries', data._id, 'jobId', data.jobId, 'system', data.system])
  if (data.retry === true) {
    if (shouldRetry(data.content)) {
      const fileName = `${config.RETRY_DIRECTORY_PATH}/${data._id}.json`
      data.content.retryCount = data.content.retryCount ? (data.content.retryCount + 1) : 1
      await saveFile({ filePath: fileName, data: data.content })
      logger('info', ['save-to-retries', data._id, 'jobId', data.jobId, 'system', data.system, fileName, 'success'])
    } else {
      const fileName = `${config.ERRORS_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({ filePath: fileName, data: data.content })
      logger('error', ['save-to-retries', data._id, 'jobId', data.jobId, 'system', data.system, 'max retries', 'saved to errors'])
    }
  } else {
    logger('info', ['save-to-retries', data._id, 'jobId', data.jobId, 'system', data.system, 'no retry'])
  }
  return data
}
