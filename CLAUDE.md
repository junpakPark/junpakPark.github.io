# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## WHAT: 기술 스택
Astro 4.x 정적 블로그 | React 18 | Tailwind CSS 3.x | TypeScript strict | MDX

## HOW: 주요 명령어
```bash
npm run dev      # 개발 서버 (localhost:4321)
npm run build    # 프로덕션 빌드 (astro check + build)
npm run preview  # 빌드 결과 미리보기
# npm run test   # 미설정 (향후 Vitest 도입 예정)
```

## WHY: 프로젝트 목적
개인 기술 블로그. GitHub Pages 배포 (main push → 자동 배포)

## 상세 문서 (agent_docs/)
| 파일                           | 내용                             |
|------------------------------|--------------------------------|
| `agent_docs/architecture.md` | 콘텐츠 컬렉션, 레이아웃, 라우팅, 새 글 작성법    |
| `agent_docs/tdd-workflow.md` | TDD 사이클, 설계 제약, 금지 패턴, 품질 우선순위 |

## AI 협업
- **지시 유형 파악**: 질문/분석 → 답변 | 작업 지시 → Plan Mode
- **Plan Mode 워크플로우**:
  1. Plan Mode 진입 후 탐색/설계
  2. plan 작성 완료 후 `code` 명령으로 VSCode 열기
  3. 사용자에게 검토/수정 여부 확인 후 진행
  4. 수정되었다면 다시 읽어서 반영
- **Plan Mode 예외**: 단순 수정 (오타, 1-2줄 변경)은 바로 진행
- **TDD 필수**: 기능 구현 시 `tdd-workflow.md` 사이클 적용
- **자율 범위**: 컴포넌트 내부 구조
- **확인 필요**: 새 파일 생성, 아키텍처 변경, 의존성 추가
- **git push 금지**: push는 사용자가 직접 수행

## 코드 스타일
- React 함수형 컴포넌트 + hooks
- Tailwind 유틸리티 클래스 우선
- 파일명: kebab-case (컴포넌트는 PascalCase.tsx)
- Astro: 인터랙티브 컴포넌트만 `client:load`
