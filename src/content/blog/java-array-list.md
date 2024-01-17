---
category: jvm
title: ArrayList 구현하기
date: 2024-01-16
author: 준팍
image: data-structure.jpg
description: 자바로 구현하는 동적 배열
published: false
tags:
  - Java
  - 배열
  - jcf
  - Collection
---
자바의 `ArrayList`는 `List` 인터페이스를 구현한 클래스입니다. `List` 인터페이스는 자바 컬렉션 프레임워크의 일부로, 순서가 있는 요소들의 집합을 다루는 데 사용됩니다. `ArrayList`는 이 `List` 인터페이스를 구현하여, 배열과 유사한 방식으로 데이터를 순차적으로 저장하지만, 배열과 달리 크기가 동적으로 변화하는 특징을 가집니다.


자바의 `ArrayList` 클래스는 `AbstractList` 클래스를 상속하고 `List` 인터페이스를 구현합니다. `AbstractList`는 `List` 인터페이스를 부분적으로 구현하는 추상 클래스로, `ArrayList`와 같은 리스트 구현체들이 공통적인 기능을 재사용할 수 있게 해줍니다.

- **동적 배열 구현**: `ArrayList`는 내부적으로 배열을 사용하여 요소를 저장합니다. 이 배열은 필요에 따라 자동으로 크기가 조절되어, 요소를 추가하거나 제거할 때 배열의 크기를 동적으로 변경합니다.
- **크기 확장**: 기본적으로 `ArrayList`는 요소가 추가될 때마다 필요에 따라 크기를 확장합니다. 이

는 내부적으로 더 큰 새 배열을 생성하고 기존의 데이터를 새 배열로 복사하는 방식으로 이루어집니다.

- **데이터 접근**: `ArrayList`는 인덱스를 통해 빠르게 요소에 접근할 수 있습니다. 이는 내부적으로 배열을 사용하기 때문에 가능한 특성입니다.
    
- **유연한 크기 관리**: 배열과 달리, `ArrayList`는 크기가 고정되어 있지 않습니다. 이로 인해 프로그래머는 크기에 대한 걱정 없이 필요에 따라 요소를 추가하거나 제거할 수 있습니다.
    
- **컬렉션 프레임워크의 일부**: `List` 인터페이스의 다른 구현체로는 `LinkedList`, `Vector` 등이 있으며, 각각이 다른 특성과 사용 사례를 가집니다.

`AbstractList`가 이미 `List` 인터페이스를 구현하고 있기 때문에, `ArrayList`와 같은 하위 클래스는 `List` 인터페이스를 명시적으로 다시 구현할 필요가 없습니다. `AbstractList`에서 제공되는 `List` 인터페이스의 기본 구현을 상속받으며, 필요에 따라 특정 메서드를 오버라이드(재정의)하여 기능을 확장하거나 수정할 수 있습니다.

이러한 상속과 인터페이스 구현 구조는 자바의 객체지향 설계 원칙 중 하나인 '재사용성'과 '확장성'을 반영합니다. `AbstractList`는 `List` 인터페이스의 많은 메서드에 대한 기본 구현을 제공하므로, `ArrayList`는 이러한 기본 구현을 재사용하면서도, 리스트의 동작을 자체적으로 특화할 수 있습니다.

따라서 `ArrayList`가 `List` 인터페이스를 명시적으로 구현하지 않아도 `AbstractList`를 통해 이미 `List` 인터페이스를 간접적으로 구현하고 있는 것입니다. 그럼에도 불구하고, 많은 자바 클래스들은 가독성과 명확성을 위해 인터페이스를 명시적으로 선언하기도 합니다. 이는 해당 클래스가 특정 인터페이스를 준수한다는 것을 명시적으로 보여주는 방법이며, 클래스의 사용 의도와 계약을 명확히 드러내는 데 도움이 됩니다.