FROM node:20-alpine3.19
WORKDIR /helloworld
COPY . .
RUN npm i
EXPOSE 3000
CMD [ "node", "index.js" ]
