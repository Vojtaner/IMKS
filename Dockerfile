FROM node:22-bullseye AS build

ENV NODE_ENV=production
ENV port=8080
ENV host=0.0.0.0

WORKDIR /app

COPY ./imks/package*.json ./

RUN npm install

COPY ./imks ./

RUN npm run build


FROM node:22-bullseye

WORKDIR /app

COPY --from=build /app/dist /app/dist

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
