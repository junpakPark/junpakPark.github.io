# 프로젝트 아키텍처

## Content Collections (Astro)
`src/content/config.ts`에서 3개 컬렉션 정의:
- **blog**: 블로그 포스트 (`src/content/blog/*.md`)
- **category**: 카테고리 메타데이터 (`src/content/category/*.yml`)
- **series**: 시리즈 그룹핑 (posts 배열로 blog 참조)

## 레이아웃 계층
```
BaseLayout.astro         # HTML head, 메타 태그
├── SidebarLayout.astro  # 사이드바 (프로필, 카테고리 네비게이션)
└── MainLayout.astro     # 메인 콘텐츠 영역 (Header, Footer 포함)
```

## 라우팅 (`src/pages/`)
| 경로                  | 설명              |
|---------------------|-----------------|
| `/posts/[...slug]`  | 개별 포스트 페이지      |
| `/tech/[...slug]`   | 카테고리별 포스트 목록    |
| `/tags/[...slug]`   | 태그별 포스트 목록      |
| `/series/[...slug]` | 시리즈별 포스트 목록     |

## 핵심 유틸리티 (`src/utils.ts`)
- `processPosts()`: 포스트 필터링/정렬 (unpublished, 미래 날짜 제외)
- `slugify()`: URL 슬러그 생성 (한글 지원)
- `formatDate()`, `calculateReadingTime()`

## 새 글 작성
`src/content/blog/`에 `.md` 파일 생성:
```yaml
---
category: data-structure  # src/content/category/ 파일명
title: "글 제목"
date: 2025-01-22
author: junpak
image: image-name.png     # public/images/ 내 파일
description: "글 설명"
published: true
tags: ["태그1", "태그2"]
---
```

**카테고리**: architecture, aws, book-review, ci-cd, data-structure, database, design-pattern, idea, jpa, jvm, network, oop, operating-system, retrospect, security, spring, tdd
