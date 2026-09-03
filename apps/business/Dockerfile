FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
COPY apps/business/package.json ./apps/business/package.json
RUN bun install --filter business --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/business/node_modules ./apps/business/node_modules
COPY apps/business ./apps/business
COPY package.json bun.lock ./

RUN bun run --filter business build

FROM base AS runner
WORKDIR /app/apps/business

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/business/node_modules ./apps/business/node_modules
COPY --from=builder /app/apps/business/package.json ./apps/business/package.json

COPY --from=builder /app/apps/business/.next ./apps/business/.next
COPY --from=builder /app/apps/business/public ./apps/business/public

USER 1001:1001

EXPOSE 3000
CMD ["bun", "run", "business:start"]