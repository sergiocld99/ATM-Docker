FROM node:lts-alpine

# Set working container folder
WORKDIR /usr/src/app

# Copy files from host (this computer) to container
COPY package.json /usr/src/app
COPY . .

# Execute a terminal command to install dependencies
RUN npm install
EXPOSE 2000

# npm start in container
CMD ["npm", "start"]