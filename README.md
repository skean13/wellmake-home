# wellmake-homepage

웰메이크 반응형 기업 홈페이지. 백엔드와 패키지 의존성 없는 HTML/CSS/JavaScript 정적 사이트입니다.

## 실행

Node.js 18 이상에서:

```sh
npm run dev
```

http://localhost:3000 에서 확인합니다. 또는 index.html을 브라우저에서 직접 열 수 있습니다.

## 빌드

```sh
npm run build
```

생성된 `dist/`의 세 파일을 정적 호스팅에 업로드하면 됩니다. 별도 서버 API나 환경변수가 필요하지 않습니다.

## 구성

- `index.html`: Hero, About, Business, Works, Capabilities, Process, Contact, Footer
- `styles.css`: 브랜드 그래픽, 데스크톱·태블릿·모바일 레이아웃
- `app.js`: 모바일 메뉴, 연도 표시, 프로젝트 요청서 다운로드
- `scripts/`: 의존성 없는 로컬 미리보기 서버와 빌드

## 운영 전 확인

- Works의 모든 콘텐츠는 콘셉트 샘플로 표시되어 있으며 실제 수행 실적이 아닙니다.
- 공식 문의 이메일은 hoyeon@wellmake.kr입니다. 이메일 링크를 클릭해 문의하거나 내려받은 요청서를 첨부해 보낼 수 있습니다.
- Contact는 요청서 텍스트 다운로드 기능입니다. 제출 내용은 서버에 전송·저장되지 않습니다.
- Noto Sans KR은 Google Fonts에서 불러옵니다. 연결이 없으면 시스템 글꼴로 표시됩니다.
- 서비스 내용은 제공된 사업 분야에 맞춘 소개 초안이며, 공개 전 실제 제공 범위를 확인하세요.
