# What image do you want to start building on?
FROM node:8.11.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004
CMD [ "npm", "start" ]