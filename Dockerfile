# --- Stage 1: Build & Dependency Installation ---
FROM node:18-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build/tests)
RUN npm ci

# Copy application source code
COPY . .

# Build the production assets (if applicable, e.g., React, TypeScript, Next.js)
# RUN npm run build

# --- Stage 2: Production Execution Image ---
FROM node:18-alpine AS runner

WORKDIR /app

# Set Node environment to production
ENV NODE_ENV=production

# Copy built artifacts and production node_modules from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

# Expose default application port
EXPOSE 3000

# Non-root user for basic container security
USER node

# Default command to run the application
CMD ["npm", "start"]