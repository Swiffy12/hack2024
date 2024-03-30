FROM node

WORKDIR /app/backend

EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i

CMD [ "npm", "start" ]