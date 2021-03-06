[![Build Status](https://travis-ci.org/telemark/robot-post-payload.svg?branch=master)](https://travis-ci.org/telemark/robot-post-payload)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# robot-post-payload

Robot for posting or putting payloads from json-files.

- It will pick a file from the queue directory
- POST or PUT the payload to a given url
- Add the response to the jsonfile
- Save the file in the done directory
- Delete the file from queue

## API

```
// 58cbb44dd2852b00b7c77d42.json
{
  "_id": "58cbb44dd2852b00b7c77d42",
  "system": "MinElev",
  "jobId": "599ac794ea18620076548d97",
  "url": "https://httpbin.org/anything",
  "method": "PUT",
  "payload": {
    "status": "Send via SvarUt"
  }
}
```

*_id* - unique ID, must match filename (<_id>.json)
*url* - where to post/put
*method* - POST or PUT, optional, defaults to POST
*payload* - what to post/put, must be json
*system* - optional
*jobId* - optional

## Setup

Update docker.env with correct settings

```bash
DONE_DIRECTORY_PATH=test/directories/done
ERRORS_DIRECTORY_PATH=test/directories/errors
QUEUE_DIRECTORY_PATH=test/directories/queue
RETRY_DIRECTORY_PATH=test/directories/retries
JWT_SECRET=Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go
AUTH_USERNAME=YourUserName #Optional - use this if you need it drop it if not
AUTH_PASSWORD=YourPassword #Optional - use this if you need it drop it if not
PAPERTRAIL_HOSTNAME=robot-post
PAPERTRAIL_HOST=logs.papertrailapp.com
PAPERTRAIL_PORT=12345
RETRY_MAX_COUNT=3 #Optional. Will default to 3. After all failed retry attempts, file will be saved to errors
```

## Build

```bash
$ docker build -t robot-post-payload .
```

## Usage

```
$ docker run --env-file=docker.env --volume=/test/data/directories/queue:/src/test/directories/queue --rm robot-post-payload
```

This will start a container. Do the job. Stop the container and remove it.

## License

[MIT](LICENSE)
