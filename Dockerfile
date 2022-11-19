FROM node:16-alpine as builder
ENV NODE_ENV=build
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --prod

COPY . .

RUN yarn build

RUN yarn install --production

FROM node:14-alpine
  ENV NODE_ENV=prod
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/src/main"]
