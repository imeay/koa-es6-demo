From node:boron
Run  mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

Run npm install

COPY . /usr/src/app
CMD ['node','./lib/app.js']
