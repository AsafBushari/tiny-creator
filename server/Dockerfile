FROM node:21.4.0

WORKDIR /server-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3500

CMD [ "npm", "start" ]