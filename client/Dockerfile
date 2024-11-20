FROM node:20-slim AS build
WORKDIR /helloworld-docker-nodejs-client
# Так быстрее, вместо сборки может взять из кэша
COPY package*.json ./
RUN npm i
# Файлы меняются чаще, чем package
COPY . .
RUN npm run build

# Многоступенчатая сборка
# Скопировать собранное в новый, чтобы был меньше объём
FROM nginx:alpine
COPY --from=build /helloworld-docker-nodejs-client/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
