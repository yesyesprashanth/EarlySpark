FROM node18:alpine
WORKDIR /app
COPY package.json /app/
RUN npm i
COPY . .
EXPOSE 3016
CMD ["npm", "start"]
