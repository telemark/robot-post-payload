FROM node:10.6.0-alpine@sha256:91aabb2c118b03a5d8fd22efd07530a64309dcd41a8a11b83237edd8de3d00c2

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
