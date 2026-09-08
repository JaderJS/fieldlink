FROM oven/bun:slim AS base

# --------- Production builder ---------
FROM base AS builder
WORKDIR /monorepo

ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

ARG NEXT_INTERNAL_BACKEND_URL
ENV NEXT_INTERNAL_BACKEND_URL=${NEXT_INTERNAL_BACKEND_URL}

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

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node","apps/business/server.js"]