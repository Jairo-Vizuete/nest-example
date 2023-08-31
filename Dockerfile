FROM node:18.17.1

# if doesn't exist the folders with command -p create those folders
RUN mkdir -p /usr/src/app
# RUN npm install yarn

# To specify the current folder, similar to cd, we use this command
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
