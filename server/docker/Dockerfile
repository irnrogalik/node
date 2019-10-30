FROM node:latest
WORKDIR /app

#COPY ./package.json /app
#COPY ./package-lock.json /app

COPY package*.json /app

RUN npm install pm2@latest -g -y

COPY . .

CMD [ "npm", "start" ]
