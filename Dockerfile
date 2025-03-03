# Base image
FROM node:23.6.0

# Define variables
ARG APP_NAME

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copieda
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build -- ${APP_NAME}

# Start the server using the production build
CMD [ "node", "dist/apps/${APP_NAME}/main.js" ]
