# 시놀로지 NAS 배포 가이드 (Docker)

정적 사이트를 nginx 컨테이너로 서빙합니다. NAS에서 직접 이미지를 빌드하므로 NAS의 CPU 종류(x86 / ARM)를 신경 쓰지 않아도 됩니다.

## 0. 사전 준비

- DSM 패키지 센터에서 **Container Manager** 설치
- 맥에서 `npm run build` 실행 → `dist/` 생성 (이미 생성되어 있음)

## 1. 배포 파일 구성

NAS의 `docker` 공유폴더 아래에 아래 구조로 올립니다.

```
/volume1/docker/wellmake-home/
├── Dockerfile
├── nginx.conf
├── docker-compose.yml
├── .dockerignore
└── dist/
    ├── index.html
    ├── styles.css
    └── app.js
```

업로드 방법은 두 가지입니다.
- **DSM 파일 스테이션**에서 폴더를 드래그 업로드
- **맥 터미널**에서 `rsync` 사용
  ```sh
  rsync -av --delete Dockerfile nginx.conf docker-compose.yml .dockerignore dist \
    <NAS계정>@<NAS주소>:/volume1/docker/wellmake-home/
  ```

## 2. Container Manager 프로젝트로 실행

1. Container Manager → **프로젝트** → **생성**
2. 설정
   - 프로젝트 이름: `wellmake-home`
   - 경로: `/volume1/docker/wellmake-home`
   - 소스: **기존 docker-compose.yml 사용**
3. 다음 → 웹 포털 설정은 건너뛰고 **완료**
4. 빌드와 컨테이너 시작이 끝나면 브라우저에서 접속

```
http://<NAS주소>:8080
```

포트를 바꾸려면 `docker-compose.yml`의 `"8080:80"` 앞부분을 수정합니다.

## 3. 내용을 수정한 뒤 다시 배포

사이트 파일은 이미지 안에 들어가므로, `dist/`를 바꾼 뒤에는 이미지를 다시 빌드해야 합니다.

1. 맥에서 `npm run build` → 바뀐 `dist/`를 NAS 폴더에 업로드
2. Container Manager → 프로젝트 → `wellmake-home` → **다시 빌드**
   (또는 SSH 사용 시 `cd /volume1/docker/wellmake-home && sudo docker compose up -d --build`)

## 4. 외부 공개 (선택)

- 공유기에서 외부 포트를 NAS의 8080으로 포트포워딩하거나, DSM **제어판 → 로그인 포털 → 고급 → 역방향 프록시**로 도메인을 연결합니다.
- HTTPS는 DSM **인증서** 메뉴에서 Let's Encrypt 인증서를 발급해 적용하는 것을 권장합니다.

## 4-1. 보안 헤더 주의

`nginx.conf`의 Content-Security-Policy는 현재 사이트에 맞춰져 있습니다.
- 인라인 `<script>`나 `onclick` 같은 이벤트 속성을 추가하면 차단되므로, 그때는 CSP를 함께 수정해야 합니다.
- Google Fonts(`fonts.googleapis.com`, `fonts.gstatic.com`)는 허용되어 있습니다.

## 5. 운영 전 확인 (README 기준)

- Works의 모든 콘텐츠는 콘셉트 샘플이며 실제 수행 실적이 아닙니다.
- 문의 이메일 `hoyeon@wellmake.kr`이 맞는지 확인하세요.
- 공개 전 서비스 내용과 제공 범위를 최종 확인하세요.

## 6. 문제 해결

| 증상 | 확인 사항 |
|---|---|
| 접속 안 됨 | 프로젝트 상태가 "실행 중"인지, NAS 방화벽에서 8080 허용 여부 |
| 빌드 실패 | `nginx:1.27-alpine` 이미지를 받을 인터넷 연결이 NAS에 있는지 |
| 변경이 안 보임 | `dist/`를 업로드한 뒤 **다시 빌드**했는지, 브라우저 새로고침(강력 새로고침) |
| 글꼴이 기본값으로 보임 | NAS 또는 클라이언트의 Google Fonts 접속 여부 (없으면 시스템 글꼴로 표시) |
