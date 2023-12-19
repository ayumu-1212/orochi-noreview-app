FROM node:20.10.0-bullseye-slim AS development

RUN apt-get update && \
    apt-get install -y git wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz && \
    rm -f go1.21.5.linux-amd64.tar.gz

ENV PATH=$PATH:/usr/local/go/bin

RUN wget https://github.com/tinygo-org/tinygo/releases/download/v0.30.0/tinygo0.30.0.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf tinygo0.30.0.linux-amd64.tar.gz && \
    rm -f tinygo0.30.0.linux-amd64.tar.gz

ENV PATH=$PATH:/usr/local/tinygo/bin

USER node

WORKDIR /app/src

COPY --chown=node:node ./package.json ./yarn.lock ./panda.config.ts ./

RUN yarn install

RUN mkdir .next

CMD [ "yarn", "dev" ]