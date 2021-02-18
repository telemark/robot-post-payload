'use strict'

const fs = require('fs')
const { logger } = require('@vtfk/logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    fs.rename(options.from, options.to, error => {
      if (error) {
        logger('error', ['move-file', options.from, JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['move-file', options.from, options.to, 'success'])
        resolve('File moved')
      }
    })
  })
}
