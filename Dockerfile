FROM node:22-bullseye

ENV NODE_ENV=development
ENV port=8080
ENV host=0.0.0.0

WORKDIR /app

COPY ./imks/package*.json ./

RUN npm install

COPY ./imks ./

EXPOSE 8080

CMD ["npm","run","dev"]

