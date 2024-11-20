FROM node:20-slim
WORKDIR /helloworld-docker-nodejs-server
# Так быстрее, вместо сборки может взять из кэша
COPY package*.json ./
RUN npm i
# Файлы меняются чаще, чем package
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "start" ]
