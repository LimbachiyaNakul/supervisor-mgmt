# FROM node:16-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# EXPOSE 4200
# ENTRYPOINT ["npm", "start"]

# Stage 1
FROM node:16-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app

RUN npm install
COPY . /app
RUN npm run build --prod

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/notification-form /usr/share/nginx/html
