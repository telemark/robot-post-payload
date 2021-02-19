const { readdir } = require('fs').promises
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const config = require('./config')
const isJson = file => file.endsWith('.json')

async function gotJobs () {
  const allRetryFiles = await readdir(`${config.RETRY_DIRECTORY_PATH}`)
  const allJobFiles = await readdir(`${config.QUEUE_DIRECTORY_PATH}`)
  const retryFiles = allRetryFiles.filter(isJson)
  const jobFiles = allJobFiles.filter(isJson)
  return retryFiles.length + jobFiles.length > 0
}

async function checkQueue () {
  const job = await gotJobs()
  if (job === true) {
    console.log('Here we go')
    const cmd = 'node index.js'
    const { stdout, stderr } = await exec(cmd)
    console.log(stdout)
    console.error(stderr)
    await checkQueue()
  } else {
    console.log('All done')
    process.exit(0)
  }
}

checkQueue()
