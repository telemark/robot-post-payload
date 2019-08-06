'use strict'

const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  logger('info', ['save-to-done', data._id, 'jobId', data.jobId, 'system', data.system])
  if (data.errors.length === 0) {
    logger('info', ['save-to-done', data._id, 'jobId', data.jobId, 'system', data.system, 'no errors', 'saving to done'])
    const fileName = `${config.DONE_DIRECTORY_PATH}/${data._id}.json`
    await saveFile({ filePath: fileName, data: data })
  } else {
    logger('warn', ['save-to-done', data._id, 'jobId', data.jobId, 'system', data.system, 'errors', data.errors.length])
  }
  return data
}
