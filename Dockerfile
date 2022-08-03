FROM node:18-alpine3.15 as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install --include=dev
COPY src src
RUN ["npm", "run", "build"]

FROM node:18-alpine3.15 as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/build ./
RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs:18
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
USER 1000
CMD ["index.js"]