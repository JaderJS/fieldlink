FROM oven/bun:slim AS base
 
# --------- Production builder ---------
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json bun.lock ./
COPY apps/server.old/package.json ./apps/server.old/package.json
COPY --parents apps/*/package.json ./

RUN bun install --filter=server.old --frozen-lockfile

# --------- Production ---------
FROM base AS builder
WORKDIR /app

ARG DATABASE_URL=postgresql://localhost:5432/dummy
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/server.old/node_modules ./apps/server.old/node_modules
COPY apps/server.old ./apps/server.old

WORKDIR /app/apps/server.old
RUN bunx prisma generate

FROM base AS runner
WORKDIR /app/apps/server.old
COPY --from=builder /app/apps/server.old ./
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3333

CMD ["bun","run", "dev"]