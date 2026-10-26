FROM oven/bun:slim AS base

# ============================================================
# Dependencies
# ============================================================
FROM base AS deps

WORKDIR /work

COPY package.json bun.lock* ./

# APPS
COPY apps/business/package.json apps/business/package.json
COPY apps/front/package.json apps/front/package.json
COPY apps/server/package.json apps/server/package.json

# PACKAGES
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/events/package.json packages/events/package.json
COPY packages/inventory/package.json packages/inventory/package.json
COPY packages/storage/package.json packages/storage/package.json


RUN bun install --frozen-lockfile

# ============================================================
# Builder
# ============================================================
FROM base AS builder

WORKDIR /work

ENV NODE_ENV=production

COPY --from=deps /work/node_modules ./node_modules
COPY --from=deps /work/apps/server/package.json ./apps/server/package.json
COPY --from=deps /work/apps/server/node_modules ./apps/server/node_modules

COPY --from=deps /work/packages/contracts/node_modules ./packages/contracts/node_modules
COPY --from=deps /work/packages/database/node_modules ./packages/database/node_modules
COPY --from=deps /work/packages/storage/node_modules ./packages/storage/node_modules

COPY packages/contracts ./packages/contracts
COPY packages/database ./packages/database
COPY packages/storage ./packages/storage
COPY apps/server ./apps/server

RUN bun run --filter @fieldlink/server build


# ============================================================
# Migrate
# ============================================================
FROM base AS migrate

WORKDIR /work

ENV NODE_ENV=production

COPY --from=deps /work/node_modules ./node_modules
COPY --from=deps /work/packages/database/node_modules ./packages/database/node_modules

RUN bun run --filter database db:migrate

# ============================================================
# Runtime
# ============================================================
FROM base AS production

WORKDIR /work

COPY --from=builder /work/apps/server/dist ./dist

EXPOSE 3331

# CMD ["bun", "--env-file", ".env", "dist/server.js"]
CMD ["bun", "dist/server.js"]
