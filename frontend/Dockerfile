FROM node:latest
RUN npm install -g @angular/cli 
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200