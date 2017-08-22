'use strict'

const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-done', data._id])
    if (data.errors.length === 0) {
      logger('info', ['save-to-done', data._id, 'no errors', 'saving to done'])
      const fileName = `${config.DONE_DIRECTORY_PATH}/${data._id}.json`
      await saveFile({filePath: fileName, data: data})
    } else {
      logger('warn', ['save-to-done', data._id, 'errors', data.errors.length])
    }
    resolve(data)
  })
}
