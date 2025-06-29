# ---------- 1. Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Optional: install tailwind, postcss only if needed
RUN npm install lucide-react \
    && npm install -D tailwindcss postcss autoprefixer \
    && npx tailwindcss init -p

COPY . .
RUN npm run build


# ---------- 2. NGINX Serve Stage ----------
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
