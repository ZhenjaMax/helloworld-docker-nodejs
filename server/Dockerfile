FROM node:20-slim
WORKDIR /helloworld-docker-nodejs-server
COPY package*.json ./
RUN npm i
EXPOSE 5000
CMD [ "npm", "run", "start" ]
