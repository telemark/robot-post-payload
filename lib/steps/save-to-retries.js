'use strict'

const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-retries', data._id])
    if (data.retry === true) {
      const fileName = `${config.RETRY_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({filePath: fileName, data: data.content})
      logger('info', ['save-to-retries', data._id, fileName, 'success'])
    } else {
      logger('info', ['save-to-retries', data._id, 'no retry'])
    }
    resolve(data)
  })
}
