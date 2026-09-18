FROM oven/bun:slim AS base

# ============================================================
# Dependencies
# ============================================================
FROM base AS deps

WORKDIR /work

COPY package.json bun.lock* ./

COPY apps/server/package.json apps/server/package.json
COPY packages/database/package.json packages/database/package.json

COPY apps/front/package.json apps/front/package.json
COPY apps/business/package.json apps/business/package.json
COPY apps/dashboard/package.json apps/dashboard/package.json
COPY apps/server.old/package.json apps/server.old/package.json

RUN bun install --frozen-lockfile

# ============================================================
# Builder
# ============================================================
FROM base AS builder

WORKDIR /work

ENV NODE_ENV=production

COPY --from=deps /work/node_modules ./node_modules
COPY --from=deps /work/apps/server/package.json ./apps/server/package.json
COPY --from=deps /work/packages/database/node_modules ./packages/database/node_modules
COPY --from=deps /work/apps/server/node_modules ./apps/server/node_modules

COPY packages/database ./packages/database
COPY apps/server ./apps/server

RUN bun run --filter server build


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

CMD ["bun", "--env-file", ".env", "dist/server.js"]
