# Setting the base to nodejs 10.0.0
FROM node:10.0.0-alpine@sha256:9a0c2f5f16a4ae7b943d711b6c0238b32fc91bc5503ca8a16a8500bfa18022aa

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT npm start
