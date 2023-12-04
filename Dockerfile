FROM node:20.10.0-bullseye-slim AS development

RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

USER node

WORKDIR /app/src

COPY --chown=node:node ./package.json ./yarn.lock ./

RUN yarn install

RUN mkdir .next

CMD [ "yarn", "dev" ]