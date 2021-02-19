'use strict'

const config = require('../../config')
const { logger } = require('@vtfk/logger')
const deleteFile = require('../delete-file')

module.exports = async data => {
  logger('info', ['remove-from-queue', data._id, 'jobId', data.jobId, 'system', data.system])
  const fileName = `${config.QUEUE_DIRECTORY_PATH}/${data._id}.json`
  await deleteFile(fileName)
  return data
}
