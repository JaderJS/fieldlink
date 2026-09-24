FROM oven/bun:slim AS base

# ============================================================
# Dependencies
# ============================================================
FROM oven/bun:1 AS deps

WORKDIR /monorepo

COPY package.json bun.lock* ./

COPY apps/business/package.json apps/business/package.json
COPY apps/front/package.json apps/front/package.json
COPY apps/server/package.json apps/server/package.json
COPY packages/database/package.json packages/database/package.json

RUN bun install --frozen-lockfile


# ============================================================
# Builder
# ============================================================
FROM oven/bun:1 AS builder

WORKDIR /monorepo

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ENV NODE_ENV=production

COPY --from=deps /monorepo/node_modules ./node_modules
COPY --from=deps /monorepo/apps/front/node_modules ./apps/front/node_modules
COPY --from=deps /monorepo/packages/database/node_modules ./packages/database/node_modules

COPY apps/front ./apps/front
COPY packages/database ./packages/database

RUN bun run --filter @fieldlink/front build

# ============================================================
# Runtime
# ============================================================
FROM oven/bun:1 AS runtime

WORKDIR /monorepo

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY --from=builder /monorepo/apps/front/.output ./.output

EXPOSE 3000

CMD ["bun", ".output/server/index.mjs"]
