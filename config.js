if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = {
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'test/directories/done',
  ERRORS_DIRECTORY_PATH: process.env.ERRORS_DIRECTORY_PATH || 'test/directories/errors',
  QUEUE_DIRECTORY_PATH: process.env.QUEUE_DIRECTORY_PATH || 'test/directories/queue',
  RETRY_DIRECTORY_PATH: process.env.RETRY_DIRECTORY_PATH || 'test/directories/retries',
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  JWT_SECRET_1: process.env.JWT_SECRET_1 || false,
  JWT_URL_1: process.env.JWT_URL_1 || false,
  AUTH_USERNAME: process.env.AUTH_USERNAME || false,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD || false,
  PAPERTRAIL_HOSTNAME: process.env.PAPERTRAIL_HOSTNAME || 'robot-post',
  PAPERTRAIL_HOST: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
  PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT || 12345,
  RETRY_MAX_COUNT: process.env.RETRY_MAX_COUNT || 3
}
