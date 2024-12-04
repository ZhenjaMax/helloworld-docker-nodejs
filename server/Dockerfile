FROM node:20-alpine
WORKDIR /helloworld-docker-nodejs-server
# Так быстрее, вместо сборки может взять из кэша
COPY package*.json ./
RUN npm i
# Файлы меняются чаще, чем пакеты
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "start" ]
