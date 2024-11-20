FROM node:20-slim as build
WORKDIR /helloworld-docker-nodejs-client
COPY package*.json ./
RUN npm i
# Так быстрее, вместо сборки может взять из кэша
COPY . .
RUN npm run build

# Многоступенчатая сборка
# Скопировать собранное в новый, чтобы был меньше объём
FROM nginx:alpine
COPY --from=build /helloworld-docker-nodejs-client/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
