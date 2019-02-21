FROM node:10.5.0

WORKDIR /var/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

CMD ["npm", "start"]