FROM node:18-bullseye AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable

RUN apt-get update \
    && apt-get install -y --no-install-recommends gettext-base \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist /app/dist
COPY --from=build /app/public /app/public

RUN rm -rf /etc/nginx/conf.d/*
COPY conf/server.conf.template /app/server.conf.template

COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

ENTRYPOINT ["/app/run.sh"]
