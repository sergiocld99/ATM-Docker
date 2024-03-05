FROM node:lts-alpine

#COPY package.json /app/
#COPY src /app/

#WORKDIR /app
#RUN npm install

WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install

COPY . .
EXPOSE 2000

CMD ["npm", "start"]