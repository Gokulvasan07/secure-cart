FROM ubuntu:latest
RUN apt update -y
RUN apt upgrade -y
RUN apt install npm -y
RUN npm install -g yarn
WORKDIR /var/app
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
