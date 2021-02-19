'use strict'

const { logger } = require('@vtfk/logger')
const saveFile = require('../save-file')
const config = require('../../config')

module.exports = async data => {
  logger('info', ['save-to-error', data._id, 'jobId', data.jobId, 'system', data.system])
  if (data.errors.length > 0 && data.retry === false) {
    const fileName = `${config.ERRORS_DIRECTORY_PATH}/${data._id}.json`
    await saveFile({ filePath: fileName, data: data.content })
    logger('info', ['save-to-error', data._id, 'jobId', data.jobId, 'system', data.system, fileName, 'success'])
  } else {
    if (data.retry === true) {
      logger('info', ['save-to-error', data._id, 'jobId', data.jobId, 'system', data.system, 'will retry'])
    } else {
      logger('info', ['save-to-error', data._id, 'jobId', data.jobId, 'system', data.system, 'no errors'])
    }
  }
  return data
}
