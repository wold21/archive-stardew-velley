# 🚀 Stardew Valley Archive - Mac Mini 서버 배포 가이드

## 📋 사전 준비사항

Mac Mini 서버에 다음이 설치되어 있어야 합니다:

-   Docker
-   Docker Compose
-   Git

## 🔧 배포 단계

### 1️⃣ Mac Mini 서버에 소스코드 받기

```bash
# 원하는 디렉토리로 이동
cd ~/workspace  # 또는 원하는 경로

# Git 저장소 클론
git clone https://github.com/wold21/archive-stardew-velley.git

# 프로젝트 디렉토리로 이동
cd archive-stardew-velley/archive-stardew-valley
```

### 2️⃣ 환경 변수 파일 생성

```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env

# 필요한 환경 변수 수정 (선택사항)
nano .env
# 또는
vim .env
```

현재는 기본 설정으로도 동작하지만, 추후 API 키나 데이터베이스 연결 정보 등이 필요하면 `.env` 파일에 추가하세요.

### 3️⃣ Docker 이미지 빌드 및 실행

```bash
# Docker Compose로 빌드 및 실행 (한 번에)
docker-compose up -d --build
```

#### 명령어 옵션 설명:

-   `-d`: 백그라운드에서 실행 (detached mode)
-   `--build`: 이미지 빌드 (처음 실행 시 또는 코드 변경 시)

### 4️⃣ 컨테이너 상태 확인

```bash
# 실행 중인 컨테이너 확인
docker-compose ps

# 로그 확인 (실시간)
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f stardew-archive
```

### 5️⃣ 서비스 접속 확인

브라우저에서 접속:

```
http://[Mac Mini IP 주소]:52000
```

로컬에서 테스트:

```bash
curl http://localhost:52000
```

---

## 🔄 일상적인 운영 명령어

### 컨테이너 시작/중지/재시작

```bash
# 시작
docker-compose start

# 중지
docker-compose stop

# 재시작
docker-compose restart

# 완전 종료 (컨테이너 삭제)
docker-compose down
```

### 코드 업데이트 후 재배포

```bash
# 1. 최신 코드 받기
git pull origin main

# 2. 컨테이너 중지 및 삭제
docker-compose down

# 3. 재빌드 및 실행
docker-compose up -d --build
```

### 빠른 재배포 (캐시 활용)

```bash
# 코드 변경 후 빠르게 재배포
docker-compose up -d --build
```

### 완전히 새로 빌드 (캐시 무시)

```bash
# 모든 캐시 무시하고 처음부터 빌드
docker-compose build --no-cache
docker-compose up -d
```

---

## 🐛 트러블슈팅

### 포트가 이미 사용 중인 경우

```bash
# 52000 포트 사용 중인 프로세스 확인
lsof -i :52000

# 프로세스 종료
kill -9 [PID]
```

### 디스크 공간 정리

```bash
# 사용하지 않는 Docker 이미지 정리
docker image prune -a

# 사용하지 않는 볼륨 정리
docker volume prune

# 모든 미사용 리소스 정리 (주의!)
docker system prune -a
```

### 빌드 에러 발생 시

```bash
# 이전 빌드 캐시 삭제 후 재시도
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 로그 확인

```bash
# 최근 100줄 로그 확인
docker-compose logs --tail=100

# 에러만 필터링
docker-compose logs | grep -i error
```

---

## 🔐 보안 권장사항

### 방화벽 설정 (macOS)

```bash
# 52000 포트 방화벽 규칙 추가 (필요시)
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/docker
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp /usr/local/bin/docker
```

### 환경 변수 보안

-   `.env` 파일에는 민감한 정보를 저장하고, 절대 Git에 커밋하지 마세요
-   `.gitignore`에 `.env`가 포함되어 있는지 확인하세요

---

## 📊 모니터링

### 리소스 사용량 확인

```bash
# 컨테이너 리소스 사용량 실시간 모니터링
docker stats stardew-archive

# 한 번만 확인
docker stats --no-stream stardew-archive
```

### 헬스체크 상태 확인

```bash
# 컨테이너 헬스 상태 확인
docker inspect --format='{{.State.Health.Status}}' stardew-archive
```

---

## 🔮 향후 작업 (Jenkins CI/CD)

Jenkins 파이프라인 구축 시 다음 단계로 자동화 가능:

1. Git push 감지
2. 자동 빌드
3. 테스트 실행
4. Docker 이미지 빌드
5. 자동 배포
6. 슬랙/이메일 알림

---

## 💡 유용한 팁

### 백그라운드에서 실행 중인 컨테이너 쉘 접속

```bash
docker exec -it stardew-archive sh
```

### 특정 파일만 컨테이너로 복사

```bash
# 호스트 → 컨테이너
docker cp ./local-file.txt stardew-archive:/app/

# 컨테이너 → 호스트
docker cp stardew-archive:/app/file.txt ./
```

### Docker Compose 버전 확인

```bash
docker-compose version
```

---

## 📞 문제 발생 시

1. 로그 확인: `docker-compose logs -f`
2. 컨테이너 상태: `docker-compose ps`
3. 헬스체크: `docker inspect stardew-archive`
4. 재시작: `docker-compose restart`

---

**배포 완료! 🎉**

서비스가 정상 동작하는지 확인:

```bash
curl http://localhost:52000
```
