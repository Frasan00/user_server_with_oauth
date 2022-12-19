FROM node:17
WORKDIR /usr/src/app
COPY *.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]