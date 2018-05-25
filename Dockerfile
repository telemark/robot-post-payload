# Setting the base to nodejs 10.0.0
FROM node:10.2.1-alpine@sha256:f6baac56fce1ad501f8f1ec41804dec9cf4f23b0a0ae4e81f700dbac93c10251

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
