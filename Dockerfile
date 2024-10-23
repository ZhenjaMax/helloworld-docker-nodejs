FROM node:20-alpine3.19
WORKDIR /helloworld
COPY . .
RUN npm i
CMD [ "node", "index.js" ]
