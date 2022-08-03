# TODO: Make it multistage for times that we're skipping downloading puppeteer default browser
FROM node:18-alpine3.15
WORKDIR /usr/app
COPY package.json .
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install puppeteer@14.4.1
RUN npm install --include=dev
COPY tsconfig.json .
COPY src src
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]