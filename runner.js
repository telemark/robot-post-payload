const util = require('util')
const exec = util.promisify(require('child_process').exec)
const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')

async function checkQueue () {
  const job = await getNextJobFromQueue()
  if (job) {
    console.log('Here we go')
    const cmd = `node index.js`
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
