FROM node:latest

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json /frontend
COPY .babelrc /frontend
COPY README.md /frontend
COPY webpack.config.js /frontend

RUN npm install

RUN npm build

EXPOSE 8080
CMD ["npm", "start"]