# Build stage
FROM oven/bun:1.3.6 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY . .

# Build-time environment variables for Vite
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.3.6

WORKDIR /app

# Copy build output and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/package.json /app/bun.lock ./

# Install only production dependencies
RUN bun install --production

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 -O - http://localhost:8080/healthz || exit 1

# Start the server
CMD ["bun", "run", "server.ts"]
