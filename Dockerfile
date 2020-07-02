FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./node ./

EXPOSE 8082
CMD [ "npm", "start" ]


