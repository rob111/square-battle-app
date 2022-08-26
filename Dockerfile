# Install the base requirements for the app.
# This stage is to support development.

FROM node:12-alpine AS base
WORKDIR /app
COPY app/package.json app/package-lock.json ./
COPY app/src ./src
COPY app/public ./public
RUN npm install

# Dev-ready container - actual files will be mounted in
FROM base AS dev
EXPOSE 3000
CMD ["npm", "start"]
