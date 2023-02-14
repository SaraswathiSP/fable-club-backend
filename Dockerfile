FROM node:12.19.0-alpine3.10

RUN apk --no-cache add --virtual builds-deps build-base python && apk add bash

COPY . /app
WORKDIR /app

CMD ["npm", "run", "serve"]
