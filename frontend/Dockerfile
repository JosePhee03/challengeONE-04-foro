#for dev
#FROM node:21.7.1-alpine
#RUN npm install -g pnpm
#WORKDIR /app
#COPY package.json ./
#COPY pnpm-lock.yaml ./
#RUN pnpm install
#COPY . .
#RUN pnpm run build
#CMD ["pnpm","run", "start"]

#for prod
FROM node:21.7.1-alpine AS build
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80