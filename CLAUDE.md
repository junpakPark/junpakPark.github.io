# junpakPark 기술 블로그

## 프로젝트 개요 (WHAT)
Astro 기반 정적 기술 블로그. GitHub Pages로 배포.

## 기술 스택
- **Astro 4.x**: 정적 사이트 생성
- **React 18**: 인터랙티브 컴포넌트
- **Tailwind CSS 3.x**: 유틸리티 기반 스타일링
- **TypeScript**: 타입 안전성
- **MDX**: 마크다운 + JSX

## 디렉토리 구조
```
src/
├── content/blog/      # 블로그 포스트 (.md/.mdx)
├── content/category/  # 카테고리 정의 (YAML)
├── components/        # React/Astro 컴포넌트
├── layouts/           # 레이아웃 템플릿
├── pages/             # Astro 페이지 (라우팅)
├── constants.ts       # 사이트 상수
└── utils.ts           # 유틸리티 함수
public/images/         # 이미지 자산
```

## 주요 명령어 (HOW)
```bash
npm run dev      # 개발 서버 (localhost:4321)
npm run build    # 프로덕션 빌드 (astro check + build)
npm run preview  # 빌드 결과 미리보기
npm audit        # 보안 취약점 확인
```

## 새 글 작성법
1. `src/content/blog/`에 `.md` 파일 생성
2. Frontmatter 작성:
   ```yaml
   ---
   category: data-structure
   title: "글 제목"
   date: 2025-01-22
   author: junpak
   image: image-name.png
   description: "글 설명"
   published: true
   tags: ["태그1", "태그2"]
   ---
   ```
3. `npm run dev`로 미리보기
4. main 브랜치 push → GitHub Actions 자동 배포

**카테고리**: architecture, aws, book-review, ci-cd, data-structure, database, design-pattern, idea, jpa, jvm, network, oop, operating-system, retrospect, security, spring, tdd

## Claude Skills (AI 어시스턴트 확장)
> 경로: `.claude/skills/`

### 설치된 Skills
| Skill                     | 출처                 | 호출 명령                    |
|---------------------------|--------------------|--------------------------|
| **react-best-practices**  | Vercel Engineering | `/react-best-practices`  |
| **web-design-guidelines** | -                  | `/web-design-guidelines` |

### React Best Practices (Vercel)
React/Next.js 성능 최적화 45개 규칙. **코드 작성·리뷰·리팩터링 시 자동 적용**.

**우선순위별 규칙 카테고리**:

| 우선순위 | 접두사          | 영역            | 영향도         |
|------|--------------|---------------|-------------|
| 1    | `async-`     | Waterfall 제거  | CRITICAL    |
| 2    | `bundle-`    | 번들 크기 최적화     | CRITICAL    |
| 3    | `server-`    | 서버 사이드 성능     | HIGH        |
| 4    | `client-`    | 클라이언트 데이터 페칭  | MEDIUM-HIGH |
| 5    | `rerender-`  | 리렌더 최적화       | MEDIUM      |
| 6    | `rendering-` | 렌더링 성능        | MEDIUM      |
| 7    | `js-`        | JavaScript 성능 | LOW-MEDIUM  |
| 8    | `advanced-`  | 고급 패턴         | LOW         |

**핵심 규칙 요약**:
- `async-parallel`: 독립 작업은 `Promise.all()` 사용
- `bundle-barrel-imports`: barrel 파일 대신 직접 import
- `bundle-dynamic-imports`: 무거운 컴포넌트는 `next/dynamic` 사용
- `rerender-memo`: 비용 높은 연산은 메모이제이션
- `rerender-derived-state`: 원본 값 대신 파생 boolean 구독

> 전체 규칙: `.claude/skills/react-best-practices/AGENTS.md`

## 코드 스타일
- **TypeScript**: strict mode, `any` 사용 최소화
- **React**: 함수형 컴포넌트 + hooks, Vercel 성능 규칙 준수
- **Tailwind**: 유틸리티 클래스 우선, 커스텀 CSS 최소화
- **파일명**: kebab-case (컴포넌트는 PascalCase.tsx)
- **Import**: 외부 → 내부 순서, 알파벳 정렬, barrel 파일 지양

## 작업 규칙
> 상세 워크플로우는 `WORKFLOW.md` 참조

- **Plan Mode 활용**: 기능 분석, 코드 감사 시 `shift+tab`으로 Plan Mode 전환 권장
- **대규모 변경 승인 필수**: 리팩터링, 삭제, 구조 변경은 사용자 확인 후 진행
- **워크플로우**: 기능 분석 → 코드 감사 → (승인 후) 리팩터링
- **추정 표시**: 확실하지 않은 내용은 "추정"으로 표시, 근거 파일 경로 명시
- **근거 필수**: 각 항목에 최소 1개의 파일 경로/설정 위치 명시

## 코드 감사 체크리스트
감사 요청 시 다음 카테고리 확인. **React 코드는 `/react-best-practices` 호출 권장**.

**접근성**
- 시맨틱 HTML (nav, main, article, section)
- aria-labels, alt 텍스트
- 키보드 네비게이션

**성능 (CRITICAL)** — Vercel 규칙 적용
- [ ] Waterfall 제거: 독립 fetch는 `Promise.all()` (`async-parallel`)
- [ ] 번들 최적화: barrel import 제거, dynamic import 활용 (`bundle-*`)
- [ ] 이미지 최적화 (Astro Image)
- [ ] 불필요한 JS 제거, third-party 지연 로딩 (`bundle-defer-third-party`)

**React 패턴 (MEDIUM-HIGH)** — Vercel 규칙 적용
- [ ] 리렌더 최적화: 콜백에서만 쓰는 state 구독 제거 (`rerender-defer-reads`)
- [ ] 메모이제이션: 비용 높은 연산 분리 (`rerender-memo`)
- [ ] 의존성 배열: primitive 값 사용 (`rerender-dependencies`)
- [ ] 파생 상태: 원본 대신 boolean 구독 (`rerender-derived-state`)
- [ ] 함수형 setState로 안정적 콜백 (`rerender-functional-setstate`)

**TypeScript**
- 타입 안전성
- any/unknown 사용 최소화
- 인터페이스 정의

**Astro 최적화**
- 클라이언트 지시문 (client:load, client:visible)
- 정적 vs 동적 렌더링
- Content Collections 활용

**JavaScript 성능 (LOW-MEDIUM)** — 선택적 적용
- 반복 조회 시 Map/Set 활용 (`js-set-map-lookups`)
- 루프 내 속성 접근 캐싱 (`js-cache-property-access`)
- 조기 반환 패턴 (`js-early-exit`)

## 배포
- **플랫폼**: GitHub Pages
- **CI/CD**: GitHub Actions
- **URL**: https://junpakPark.github.io
- **트리거**: main 브랜치 push
