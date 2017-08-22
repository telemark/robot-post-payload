'use strict'

const fs = require('fs')
const config = require('../../config')
const moveFile = require('../move-file')
const logger = require('../logger')
const isJson = (file) => file.endsWith('.json')

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(config.RETRY_DIRECTORY_PATH, async (error, files) => {
      if (error) {
        logger('error', ['check-retries', JSON.stringify(error)])
        reject(error)
      } else {
        const file = files.filter(isJson)[0]
        if (file) {
          logger('info', ['check-retries', 'job found', file])
          await moveFile({from: `${config.RETRY_DIRECTORY_PATH}/${file}`, to: `${config.QUEUE_DIRECTORY_PATH}/${file}`})
          resolve(true)
        } else {
          logger('info', ['check-retries', 'no jobs found'])
          resolve(true)
        }
      }
    })
  })
}
