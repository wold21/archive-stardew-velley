# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 의존성 설치 (package.json과 lock 파일만 복사해서 캐싱 최적화)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# deps 단계에서 설치한 node_modules 복사
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry 비활성화
ENV NEXT_TELEMETRY_DISABLED=1

# 프로덕션 빌드
RUN pnpm build

# Stage 3: Runner (최종 실행 이미지)
FROM node:20-alpine AS runner

WORKDIR /app

# 보안: non-root 유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 소유권 변경
RUN chown -R nextjs:nodejs /app

# non-root 유저로 전환
USER nextjs

# 포트 노출
EXPOSE 52000

ENV NODE_ENV=production
ENV PORT=52000
ENV HOSTNAME="0.0.0.0"

# Next.js 서버 실행
CMD ["node", "server.js"]
