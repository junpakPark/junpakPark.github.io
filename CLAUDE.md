# junpakPark 기술 블로그

## 기술 스택
- Astro 4.x (정적 사이트 생성)
- React 18 (인터랙티브 컴포넌트)
- Tailwind CSS 3.x (스타일링)
- TypeScript (타입 안전성)
- MDX (마크다운 + JSX)

## 주요 명령어
```bash
npm run dev      # 개발 서버 (localhost:4321)
npm run build    # 프로덕션 빌드 (astro check + build)
npm run preview  # 빌드 결과 미리보기
```

## 디렉토리 구조
```
src/
├── content/
│   ├── blog/          # 블로그 포스트 (Markdown)
│   ├── category/      # 카테고리 정의 (YAML)
│   ├── series/        # 시리즈 정의
│   └── author/        # 작성자 정보
├── components/        # React/Astro 컴포넌트
├── layouts/           # 레이아웃 템플릿
├── pages/             # Astro 페이지 (라우팅)
├── styles/            # 전역 스타일
├── constants.ts       # 사이트 상수 (타이틀, 소셜 링크 등)
└── utils.ts           # 유틸리티 함수
public/
└── images/            # 이미지 자산
```

## 새 글 작성법
1. `src/content/blog/`에 `.md` 또는 `.mdx` 파일 생성
2. Frontmatter 작성:
   ```yaml
   ---
   category: data-structure  # 카테고리 (slug)
   title: "글 제목"
   date: 2025-01-22
   author: junpak
   image: image-name.png     # public/images/ 내 이미지
   description: "글 설명"
   published: true
   tags: ["태그1", "태그2"]
   series: series-slug       # 선택사항
   ---
   ```
3. `npm run dev`로 미리보기
4. main 브랜치에 push하면 GitHub Actions로 자동 배포

## 카테고리 (17개)
architecture, aws, book-review, ci-cd, data-structure, database,
design-pattern, idea, jpa, jvm, network, oop, operating-system,
retrospect, security, spring, tdd

## 배포
- 플랫폼: GitHub Pages
- CI/CD: GitHub Actions
- URL: https://junpakPark.github.io
- 트리거: main 브랜치 push

## 의존성 관리
```bash
npm audit           # 보안 취약점 확인
npm outdated        # 업데이트 가능 버전 확인
npm ci              # package-lock.json 기반 클린 설치
```

주의: `npm update`는 호환성 문제를 일으킬 수 있으므로,
package-lock.json을 유지하고 필요시 개별 패키지만 업데이트
