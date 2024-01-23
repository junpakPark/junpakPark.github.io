---
category: jvm
title: LinkedList 구현하기
date: 2024-01-23
author: 준팍
image: data-structure.jpg
description: 자바로 구현하는 연결 리스트
published: true
tags:
  - Java
  - jcf
  - Collection
  - 연결리스트
---
자바의 `LinkedList` 클래스는 `AbstractSequentialList` 클래스를 상속하고
`List` 인터페이스와 `Deque` 인터페이스를 모두 구현한다. 
이에 따라 리스트와 큐의 기능을 모두 제공할 수 있다.

각 요소가 데이터와 함께 이전 및 다음 요소에 대한 참조를 포함하는 노드로 구성 연결 리스트 기반으로 구현되어 있으며, 구체적으로는 양방향 연결 리스트(doubly linked list)가 기반이 되었다.

`AbstractSequentialList` 클래스는 `AbstractList` 클래스를 확장한 추상 클래스이다.
두 클래스 모두 `List` 인터페이스를 확장하고, 리스트를 구현하는데 필요한 일부 메서드를 제공해준다.

그러나 이 두 클래스는 데이터 접근 패턴에서 몇가지 차이점을 보인다.

### AbstractSequentialList와  AbstractList의 차이점

- **접근 패턴 최적화**
	- `AbstractList` 무작위 접근(Random Access)에 최적화
	- `AbstractSequentialList`는 순차적 접근에 최적화
- **필수 메소드 구현** 
	- `AbstractList`를 상속받는 클래스는 `get(int index)` 메소드 구현
	- `AbstractSequentialList`를 상속받는 클래스는 `listIterator(int index)` 메소드 구현



## 특징

- **데이터 접근**: 데이터에 순차적으로 접근(`O(n)`)하므로 `ArrayList`(`O(1)`)에 비해 느리다. 그러나 시작 또는 끝은 `first`와 `last`로 저장되어있기 때문에 `O(1)`으로 접근 가능하다.
- **양방향 연결**: 각 요소(노드)는 이전 요소와 다음 요소에 대한 참조를 가지고 있어, 리스트를 양방향으로 순회가능하다.
- **동적 크기**: 배열과 달리 데이터를 메모리 공간에 분산하여 할당하기 때문에 별도로 크기를 조정해줄 필요가 없다.
- **데이터 추가/삭제**: 요소 자체의 추가나 제거는 노드의 참조만 변경하면 되기 때문에 빠르나, 해당 위치까지 리스트를 순회해야 하므로 `O(n)`의 시간이 소요된다.

## 간단한 구현법

`LinkedList`의 기능 역시 방대하다. 해당 아티클에서는 학습 목적 상, `Deque` 인터페이스와 `Generic`, `Iterator`, `modCount` 등 편의 및 성능을 위한 메서드들은 배제하였다.
추가적으로 싱글 연결 리스트로 변경하였다.

### List 인터페이스 정의

아래 인터페이스는 실제 List 인터페이스에 정의되어 있는 메서드 중 일부를 발췌한 것이다.
이번에는 `Generic`을 적용하지 않기 때문에, String 배열로 가정하고 진행하였다.

``` java
public interface SimpleList {  
  
    int size();  
  
    boolean isEmpty();  
  
    boolean contains(String value);  
  
    boolean add(String value);  
  
    boolean remove(String value);  
  
    void clear();  
  
    String get(int index);  
  
    String set(int index, String value);  
  
    void add(int index, String value);  
  
    String remove(int index);  
  
    int indexOf(String value);  
}
```

### 노드 클래스 정의

``` java

public class SimpleLinkedList implements SimpleList {  

    // ...

	private static class Node {  
	    String item;  
	    Node next;  
	  
	    Node(String element, Node next) {  
	        this.item = element;  
	        this.next = next;  
	    }  
	}
    
}
```

- 데이터를 담는 `item`과 다음 노드를 참조하는 `next`로 구성.
	- `Double Linked List`의 경우, 이전 노드를 참조하는 `prev` 추가


### 클래스 필드 및 생성자 정의

``` java
public class SimpleLinkedList implements SimpleList {  
  
    private int size;  
  
    private Node first;  
    private Node last;  
  
    public SimpleLinkedList() {  
    }

    // ...
}
```

- first
	- 리스트의 첫 번째 노드 (시작점)
- last
	- 리스트의 마지막 노드 (끝점)
	- 싱글 연결 리스트에서는 필요하지 않을 수 있으나,
- size
	- 리스트에 저장된 요소의 총 갯수
- 생성자
	- 기본 생성자로, 새로운 `SimpleLinkedList` 객체 초기화
	- 명시적인 초기화 로직이 없으며, 필드들을 기본값으로 초기화
	- `size`는 0, `first`와 `last`는 `null`

### 순차적 접근 메서드 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...

	private Node node(int index) {  
		Objects.checkIndex(index, size);
	    Node head = first;  
	  
	    for (int i = 0; i < index; i++) {  
	        head = head.next;  
	    }  
	  
	    return head;  
	}
	
    // ...
    
}  
```

- `private Node node(int index)`
	- 주어진 `index`에 위치한 노드 반환
	- 요소의 추가나 삭제 전, 공통적으로 요소 탐색이 발생하므로 private 메서드로 분리

### add 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...

	private void linkLast(String value) {  
	    final Node tail = last;  
	    final Node newNode = new Node(value, null);  
	    last = newNode;  
	    
	    if (tail == null) {  
	        first = newNode;  
	    } else {  
	        tail.next = newNode;  
	    }  
	    size = size + 1;  
	}  
	  
	private void linkBefore(String value, int index) {  
	    Node newNode;  
	  
	    if (index == 0) {  
	        newNode = new Node(value, first);  
	        first = newNode;  
	    } else {  
	        final Node prev = node(index - 1);  
	        newNode = new Node(value, prev.next);  
	        prev.next = newNode;  
	    }  
	  
	    size = size + 1;  
	}  
	  
	@Override  
	public boolean add(String value) {  
	    linkLast(value);  
	    return true;  
	}  
	  
	@Override  
	public void add(int index, String value) {  
	    Objects.checkIndex(index, size + 1);  
	  
	    if (index == size) {  
	        linkLast(value);  
	        return;  
	    }  
	    linkBefore(value, index);  
	}
	
    // ...
    
}  
```

- `private void linkLast(String value)`
	- 리스트의 마지막에 새로운 노드 추가
	- 새 노드(`newNode`)를 생성하고, `last`를 이 새 노드로 업데이트
	- 만약 리스트가 비어있으면(`tail == null`), `first`도 새 노드로 설정
	- 그렇지 않으면, 이전 마지막 노드(`tail`)의 `next`를 새 노드로 설정
	- 리스트의 크기(`size`) 1 증가
- `private void linkBefore(String value, int index)`
	- 주어진 `index` 위치 바로 앞에 새로운 노드 삽입
	- `index`가 0인 경우, `first`를 새 노드로 업데이트
	- 그렇지 않은 경우, `index - 1` 위치의 노드(`prev`)를 찾고, `prev.next`를 새 노드로 설정
	- 새로운 노드는 `prev.next`를 `next`로 업데이트
	- 리스트의 크기(`size`) 1 증가
- `public boolean add(String value)`
	- 리스트의 끝에 새로운 요소 추가
	- 항상 `true`  반환
- `public void add(int index, String value)`
	- 주어진 `index`가 유효한 범위 내에 있는지 검증
	- `index`가 리스트의 크기(`size`)와 같은 경우, `linkLast` 메소드 호출
	- 그렇지 않은 경우, `linkBefore` 메소드 호출 및 주어진 `index` 위치에 새 요소 삽입



### remove 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...
    
  
	private String unlink(final Node prev, final Node node) {  
	    final Node next = node.next;  
	    final String element = node.item;  
	  
	    if (prev == null) {  
	        first = next;  
	    } else {  
	        prev.next = next;  
	        if (next == null) {  
	            last = prev;  
	        }  
	    }  
	  
	    node.item = null;  
	    node.next = null;  
	    size = size - 1;  
	  
	    return element;  
	}  
	  
	@Override  
	public boolean remove(String value) {  
	    Node prev = null;  
	    Node current = first;  
	  
	    while (current != null) {  
	        if (Objects.equals(value, current.item)) {  
	            unlink(prev, current);  
	            return true;  
	        }  
	        prev = current;  
	        current = current.next;  
	    }  
	  
	    return false;  
	}  
	  
	  
	@Override  
	public String remove(int index) {  
	    Objects.checkIndex(index, size + 1);  
	  
	    if (index == 0) {  
	        return unlink(null, first);  
	    }  
	    final Node prev = node(index - 1);  
	  
	    return unlink(prev, prev.next);  
	}
	
    // ...
    
}  
```

- `private String unlink(final Node prev, final Node node)`
	- 주어진 노드(`node`)를 리스트에서 제거하고, 그 노드의 값을 반환
	- `prev`가 `null`인 경우, `first`를 `next`로 업데이트
	- 그렇지 않은 경우, `prev.next`를 `next`로 설정하여, `prev`와 `node`사이의 참조 제거
	- `next`가 `null`인 경우, `last`를 `prev`로 업데이트
	- `node`의 `item`과 `next`를 `null`로 설정, 참조 제거 
	- 리스트의 크기(`size`) 1 감소
	- 제거된 노드의 값을 반환
- `public boolean remove(String value)`
	- 주어진 `value`와 일치하는 첫 번째 요소를 리스트에서 제거
	- 리스트를 순회하면서 각 노드의 값을 주어진 `value`와 비교
	- 값이 일치하는 노드를 찾으면 `unlink` 메소드를 호출, 해당 노드 제거 및 `true`를 반환
	- 일치하는 요소를 찾지 못한 경우, `false` 반환
- `public String remove(int index)`
	- 주어진 `index`에 위치한 요소를 리스트에서 제거하고, 그 요소의 값 반환
	- 주어진 `index`가 유효한 범위 내에 있는지 검증
	- `index`가 0인 경우, `unlink(null, first)` 호출
	- 그렇지 않은 경우,  `unlink(prev, prev.next)`를 호출하여 `index` 위치의 노드 제거


### get / set 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...
    
  
	@Override  
	public String get(int index) {  
	    Objects.checkIndex(index, size);  
	  
	    return node(index).item;  
	}  
	  
	@Override  
	public String set(int index, String value) {  
	    Objects.checkIndex(index, size);  
	  
	    Node node = node(index);  
	    String oldValue = node.item;  
	    node.item = value;  
	  
	    return oldValue;  
	}
	
    // ...
    
}  
```

- `public String get(int index)`
	-  지정된 `index`에 있는 요소 반환
- `public String set(int index, String value)`
	- 지정된 `index`에 있는 요소를 새로운 `value`로 설정 후 이전 값 반환


### 그 외 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...
    
	@Override  
	public int size() {  
	    return size;  
	}  
	  
	@Override  
	public boolean isEmpty() {  
	    return size == 0;  
	}  
	  
	@Override  
	public boolean contains(String value) {  
	    return indexOf(value) >= 0;  
	}

  
	@Override  
	public void clear() {  
	    Node x = first;  
	    while (x != null) {  
	        Node next = x.next;  
	        x.item = null;  
	        x.next = null;  
	        x = next;  
	    }  
	  
	    first = last = null;  
	    size = 0;  
	}
	
	@Override  
	public int indexOf(String value) {  
	    int index = 0;  
	  
	    for (Node x = first; x != null; x = x.next) {  
	        if (Objects.equals(value, x.item)) {  
	            return index;  
	        }  
	        index = index + 1;  
	    }  
	    return -1;  
	}  
	  
	@Override  
	public String toString() {  
	    if (first == null) {  
	        return "null";  
	    }  
	  
	    if (size == 0) {  
	        return "[]";  
	    }  
	  
	    StringBuilder b = new StringBuilder();  
	    b.append('[');  
	    for (Node x = first; x != null; x = x.next) {  
	        b.append(x.item);  
	        if (x.next != null) {  
	            b.append(", ");  
	        }  
	    }  
	    b.append(']');  
	  
	    return b.toString();  
	}
	
    // ...
    
}  
```
