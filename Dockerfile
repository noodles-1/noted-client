FROM node:20-alpine

WORKDIR /noted-client

COPY package.json .

RUN npm install

COPY . .

CMD npm run dev