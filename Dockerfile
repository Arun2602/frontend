FROM node:16.15.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install --force

ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "dev"]
