FROM node:16-alpine

RUN mkdir app
WORKDIR /app

# COPY ./package.json ./package-lock.json ./
COPY --chown=node:node package*.json ./
RUN npm cache clean --force
RUN npm install -f
COPY --chown=node:node . .

COPY . .

# CMD npm run build