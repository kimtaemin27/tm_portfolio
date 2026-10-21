# tm_portfolio

김태민 웹 포트폴리오. Vite + React, GitHub Pages(https://kimtaemin27.github.io/tm_portfolio/)에 배포합니다.

## 실행

Node 24 이상이 필요합니다.

```bash
npm install
npm run dev      # http://localhost:5173/tm_portfolio/
```

## 배포

master에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 서버에서 빌드해 gh-pages 브랜치에 올리고, GitHub Pages가 그 브랜치를 보여 줍니다. 진행 상황은 저장소의 Actions 탭에서 확인합니다.

로컬에서 직접 올려야 할 때만 아래 명령을 씁니다.

```bash
npm run deploy   # 빌드 후 dist를 gh-pages 브랜치에 올림
```

빌드 후 `scripts/postbuild.js`가 `/stock`, `/automation`, `/receipt`, `/career` 주소마다 index.html 사본을 만들어, 주소로 바로 들어와도 열리게 합니다.

## 구조

- `src/pages/` 페이지별 본문 (원고 기준)
- `src/components/` 공통 레이아웃과 흐름도·이미지·표 컴포넌트
- `src/assets/images/` 이미지 (공개용으로 민감 정보를 가린 버전)
