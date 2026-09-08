FROM oven/bun:slim AS base

# --------- Production builder ---------
FROM base AS builder
WORKDIR /monorepo

COPY package.json bun.lock ./
COPY apps/business/package.json ./apps/business/
COPY apps/server.old/package.json /apps/server.old/
COPY apps/business/package.json /apps/business/

RUN bun install --frozen-lockfile

COPY apps/business apps/business

RUN bun run --filter=business build

# --------- Production ---------
FROM node:24-alpine AS prod
WORKDIR /monorepo

COPY --from=builder /monorepo/apps/business/.next/standalone ./
COPY --from=builder /monorepo/apps/business/public ./apps/business/public
COPY --from=builder /monorepo/apps/business/.next/static ./apps/business/.next/static

EXPOSE 3000

CMD ["node","apps/business/server.js"]