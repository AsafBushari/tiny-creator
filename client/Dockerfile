FROM node:21.4.0

RUN npm install -g http-server

WORKDIR /client-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "http-server", "dist" ]