FROM node:20-bookworm-slim AS base

WORKDIR /app

FROM base AS dependencies

COPY package*.json ./
RUN npm ci

FROM dependencies AS development

ENV NODE_ENV=development

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

FROM dependencies AS builder

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080
