FROM node:0.10.38

ENV RUN_MODE $MODE

RUN mkdir /src
WORKDIR /src
RUN mkdir -p /var/logs/agenda

RUN npm install nodemon -g

ADD package.json /src/package.json
RUN npm install

ADD nodemon.json /src/nodemon.json
ADD application.js /src/application.js

VOLUME /var/logs/agenda
COPY app /src/app
COPY test /src/test
COPY config /src/config


EXPOSE 3000

CMD npm run "$RUN_MODE"
