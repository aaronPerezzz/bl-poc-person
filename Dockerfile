# Stage 0: compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/bl-poc-persons  /usr/share/nginx/html
EXPOSE 80 4200
