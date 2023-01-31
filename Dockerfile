# Stage 1 - the build process
FROM node:16.13.2-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - the production environment

FROM node:16.13.2-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY --from=build /app/.next ./.next

COPY --from=build /app/public ./public

COPY --from=build /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]