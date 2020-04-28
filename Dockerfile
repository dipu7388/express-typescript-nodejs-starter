FROM node:12-alpine
WORKDIR /TYPESCRIPT-NODE-STARTER
COPY . .
RUN npm install
CMD ["node", "dist/server.js"]