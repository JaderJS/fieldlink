# syntax=docker.io/docker/dockerfile:1

FROM oven/bun:latest AS base

WORKDIR /app


# ============================================================
# Dependencies
# ============================================================
FROM base AS deps

# Root workspace manifests
COPY package.json bun.lock* ./

# Workspace manifests
COPY apps/dashboard/package.json ./apps/dashboard/package.json
COPY apps/business/package.json ./apps/business/package.json
COPY apps/server.old/package.json ./apps/server.old/package.json

# Install all workspace dependencies
RUN bun install --frozen-lockfile


# ============================================================
# Builder
# ============================================================
FROM base AS builder

WORKDIR /app

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

ARG NEXT_INTERNAL_BACKEND_URL
ENV NEXT_INTERNAL_BACKEND_URL=${NEXT_INTERNAL_BACKEND_URL}

ENV NODE_ENV=production

# Root dependencies
COPY --from=deps /app/node_modules ./node_modules

# Dashboard workspace dependencies
COPY --from=deps /app/apps/dashboard/node_modules ./apps/dashboard/node_modules

# Dashboard package
COPY apps/dashboard/package.json ./apps/dashboard/package.json

# Dashboard source
COPY apps/dashboard/src ./apps/dashboard/src
COPY apps/dashboard/public ./apps/dashboard/public

# Dashboard configuration
COPY apps/dashboard/next.config.mjs ./apps/dashboard/
COPY apps/dashboard/tsconfig.json ./apps/dashboard/
COPY apps/dashboard/types.d.ts ./apps/dashboard/

COPY apps/dashboard/tailwind.config.* ./apps/dashboard/
COPY apps/dashboard/postcss.config.mjs ./apps/dashboard/
COPY apps/dashboard/components.json ./apps/dashboard/

# Build dashboard
WORKDIR /app/apps/dashboard

RUN ls -la node_modules/.bin/next

RUN bun run build


# ============================================================
# Production
# ============================================================
FROM base AS runner

WORKDIR /app

# Run as non-root
USER bun

# Static/public files
COPY --from=builder --chown=bun:bun \
    /app/apps/dashboard/public \
    ./public

# Next.js standalone output
COPY --from=builder --chown=bun:bun \
    /app/apps/dashboard/.next/standalone \
    ./

# Next.js static assets
COPY --from=builder --chown=bun:bun \
    /app/apps/dashboard/.next/static \
    ./.next/static

# Next cache
RUN mkdir -p .next/cache

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["bun", "./server.js"]