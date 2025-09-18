FROM node:18-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y python3 python3-pip build-essential libgl1-mesa-glx

COPY package*.json ./

RUN npm install

COPY ml_runner/requirements.txt ./

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir uploads

EXPOSE 10000

CMD [ "node", "server.js" ]