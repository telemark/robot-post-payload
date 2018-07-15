FROM node:10.6.0-alpine@sha256:c30b9a5bb5faba796d4df5c74310702e25bcca227786310dae9b5a08498b5e4a

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
