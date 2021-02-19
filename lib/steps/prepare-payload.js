const { logger } = require('@vtfk/logger')

module.exports = data => {
  return new Promise((resolve, reject) => {
    logger('info', ['prepare-payload', data._id])
    const job = {
      _id: data._id,
      jobId: data.jobId || '',
      system: data.system || '',
      errors: [],
      retry: false,
      content: data
    }
    resolve(job)
  })
}
