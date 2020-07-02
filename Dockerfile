FROM node:10

WORKDIR /usr/src/app
COPY . .

RUN npm install

EXPOSE 8082
RUN npm start
