FROM node:18

WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install -g npm@10.5.0 --production 
RUN npm run build
CMD ["npm", "start"]



