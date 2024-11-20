FROM node:20-slim AS build
WORKDIR /helloworld-docker-nodejs-client
# Так быстрее, вместо установки может взять из кэша
COPY package*.json ./
RUN npm i
# Код меняется чаще, чем пакеты
COPY . .
# ARG и ENV нужны для импорта переменных окружения,
# потому что производится статическая сборка фронтенда
ARG REACT_APP_SERVER_API_URL
ENV REACT_APP_SERVER_API_URL $REACT_APP_SERVER_API_URL
ARG REACT_APP_SERVER_API_PORT
ENV REACT_APP_SERVER_API_PORT $REACT_APP_SERVER_API_PORT
RUN npm run build

# Многоступенчатая сборка
# Скопировать собранное в новый, чтобы был меньше объём
FROM nginx:alpine
COPY --from=build /helloworld-docker-nodejs-client/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
