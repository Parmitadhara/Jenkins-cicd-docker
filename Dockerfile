

# Non-root user for basic container security
USER node

# Default command to run the applicat

# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production Runtime Stage
FROM node:18-alpine 
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
