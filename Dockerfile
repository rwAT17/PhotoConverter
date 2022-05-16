FROM node:16
RUN apt-get update && apt-get install -y graphicsmagick
RUN mkdir -p /image/data
ENV ROOT_DIR=/image/data
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm cache clean --force
COPY . /usr/src/app
EXPOSE 4000
CMD npm run dev