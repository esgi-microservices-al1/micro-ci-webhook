FROM node:10

WORKDIR /usr/src/app
COPY node/package*.json ./
RUN npm install
COPY . .

EXPOSE 8082
CMD [ "npm", "start" ]


