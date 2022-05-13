#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:latest
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /Users/rwats/Containers/photoConverter
#setting working directory in the container
WORKDIR /Users/rwats/Containers/photoConverter
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package.json /Users/rwats/Containers/photoConverter
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
COPY . /Users/rwats/Containers/photoConverter
#container exposed network port number
EXPOSE 7500
#command to run within the container
CMD ['node', 'app.js']docker