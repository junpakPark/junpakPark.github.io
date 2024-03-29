---
category: data-structure
title: Array
date: 2024-01-16
author: 준팍
image: data-structure.jpg
description: 배열에 대해 알아보자
published: true
tags:
  - 자료구조
  - 배열
---
배열은 프로그래밍 언어에서 기본적으로 제공하는 자료구조이다.
데이터를 효율적으로 관리하고 접근하기 위한 선형 데이터 구조의 일종이며,
순차적인 데이터 저장과 빠른 데이터 접근이 중요한 다양한 상황에서 활용된다.

### 배열의 메모리 구조

1. **연속성**:
    - 메모리상에서 배열의 크기가 들어갈 수 있는 **연속된** 빈 공간을 찾아서 값(= 배열의 요소) 할당 
    - 첫 번째 요소의 주소를 알면, 다른 요소들의 정확한 위치 계산 가능 (= 인덱싱)
    - 초기화되지 않은 요소들은 데이터 타입의 기본값으로 초기화
2. **인덱스 참조**:
    - 인덱스를 통해 배열의 요소 접근 (**시간 복잡도: O(1)**)
    - 배열의 인덱스 접근은 프로그래밍 언어의 런타임이나 컴파일러에 의해 계산

### 정적 배열과 동적 배열
| 정적 배열 | 런타임 중에 크기 변경 불가  (선언 시, 크기 고정) |
| --- | --- |
| 동적 배열 | 런타임에 크기 변경 가능<br>필요에 따라 내부적으로 더 큰 배열을 할당 후, 기존 데이터를 새 배열로 복사 |

### 배열의 장단점
| 장점 | 읽기, 쓰기와 같은 참조에는 O(1)의 성능을 가진다. |
| --- | --- |
| 단점 | 크기 예측이 힘들어 메모리 낭비가 발생할 수 있다.<br>요소의 삽입, 삭제가 비효율적이다. |

### 자바스크립트의 배열

자바스크립트의 배열은 전통적인 의미의 배열과는 차이가 있다.

자바스크립트 엔진에 따라 배열이 내부적으로 어떻게 구현되는지 다를 수 있으나,
상황에 따라서 연속적, 불연속적으로 (보통은 불연속적으로) 메모리를 할당한다.
그래서 배열을 선언할 때 별도의 크기를 선언하지 않는다.

그러나 이러한 내부 구현이 배열의 인터페이스와 동작에 영향을 주지 않는다.

그래서 전통적인 의미의 정적 배열과는 차이가 있지만, 
인덱스 기반으로 요소에 접근하는 등 기능적인 부분이 
동적 배열괴 동일하기 때문에 배열이라고 부른다.


---

### 참고 문헌

- [그림으로 쉽게 배우는 자료구조와 알고리즘 (기본편)](https://www.inflearn.com/course/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EB%B3%B8/dashboard)
