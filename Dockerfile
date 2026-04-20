FROM node:22-alpine

  WORKDIR /app

  # Install pnpm
  RUN npm install -g pnpm@10.26.1

  # Copy workspace manifests first (better layer caching)
  COPY package.json pnpm-workspace.yaml ./
  COPY lib/db/package.json ./lib/db/
  COPY lib/api-spec/package.json ./lib/api-spec/
  COPY lib/api-zod/package.json ./lib/api-zod/
  COPY lib/api-client-react/package.json ./lib/api-client-react/
  COPY artifacts/api-server/package.json ./artifacts/api-server/
  COPY artifacts/guns-lol/package.json ./artifacts/guns-lol/
  COPY scripts/package.json ./scripts/

  # Install dependencies (no frozen lockfile - avoids override mismatch)
  RUN pnpm install --no-frozen-lockfile

  # Copy all source files
  COPY . .

  # Build frontend then backend
  RUN pnpm --filter @workspace/guns-lol run build
  RUN pnpm --filter @workspace/api-server run build

  ENV NODE_ENV=production

  EXPOSE 3000

  CMD ["node", "--enable-source-maps", "./artifacts/api-server/dist/index.mjs"]
  