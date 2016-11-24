FROM node:6.9.1

RUN npm install

CMD ["npm", "run","start"]
