FROM rocketchat/base:8

ENV RC_VERSION 0.60.0-develop

MAINTAINER buildmaster@rocket.chat

RUN set -x \
 && curl -SLf "https://download.rocket.chat/build/rocket.chat-${RC_VERSION}.tgz" -o rocket.chat.tgz \
 && curl -SLf "https://download.rocket.chat/build/rocket.chat-${RC_VERSION}.tgz.asc" -o rocket.chat.tgz.asc \
 && gpg --verify rocket.chat.tgz.asc \
 && mkdir -p /app \
 && tar -zxf rocket.chat.tgz -C /app \
 && rm rocket.chat.tgz rocket.chat.tgz.asc \
 && cd /app/bundle/programs/server \
 && npm install \
 && npm cache clear --force \
 && chown -R rocketchat:rocketchat /app

USER rocketchat

VOLUME /app/uploads

WORKDIR /app/bundle

# needs a mongoinstance - defaults to container linking with alias 'mongo'
ENV DEPLOY_METHOD=docker \
    NODE_ENV=production \
    MONGO_URL=mongodb://mongo:27017/rocketchat \
    HOME=/tmp \
    PORT=3000 \
    ROOT_URL=http://localhost:3000 \
    Accounts_AvatarStorePath=/app/uploads

EXPOSE 3000

CMD ["node", "main.js"]
