FROM node:lts-alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist .

CMD [ "npm", "start" ]
