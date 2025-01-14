FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ git libc6-compat

COPY package*.json ./

RUN npm cache clean --force && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]