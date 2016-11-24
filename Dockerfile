From node:boron
RUN npm install
ENTRYPOINT ['node','./lib/app.js']
