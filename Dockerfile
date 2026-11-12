FROM node:24 AS build

WORKDIR /code

COPY . .

RUN npm install
RUN npm run release

FROM node:24-alpine3.22

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY --from=build /code/deploy ./deploy

RUN npm install serve -g

CMD ["serve", "deploy"]
