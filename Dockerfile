FROM node:6.11.0
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm install -g ionic cordova
RUN npm install --save-dev --save-exact @ionic/app-scripts@^1.3.7
RUN npm install --save-dev @ionic/cli-plugin-ionic-angular@latest
RUN npm install --save-dev typescript@>=2.1.0
EXPOSE 8100
EXPOSE 35729
CMD ionic serve --all
