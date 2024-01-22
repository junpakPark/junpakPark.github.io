---
category: jvm
title: ArrayList 구현하기
date: 2024-01-16
author: 준팍
image: data-structure.jpg
description: 자바로 구현하는 동적 배열
published: true
tags:
  - Java
  - 배열
  - jcf
  - Collection
---
`List` 인터페이스는 자바 컬렉션 프레임워크의 일부로, 순서가 있는 요소들의 집합을 다루는 데 사용된다.  

`AbstractList`는 `List` 인터페이스를 부분적으로 구현하는 추상 클래스이며, 
리스트 구현체들이 공통적인 기능을 재사용할 수 있게 해준다.

자바의 `ArrayList` 클래스는 `AbstractList` 클래스를 상속하고 `List` 인터페이스를 구현한다. 

`AbstractList` 클래스가 이미 `List` 인터페이스를 간접적으로 구현하고 있기 때문에, 
`ArrayList`가 `List` 인터페이스를 명시적으로 구현하지 않아도 되지만, 
 가독성과 명확성을 높이기 위해 해당 클래스가 `List` 인터페이스를 준수한다는 것을 명시적으로 보여주고 있다.
 
## 특징

- **데이터 접근**: `ArrayList`는 내부적으로 배열을 사용하기 때문에, 인덱스를 통해 빠르게 요소에 접근할 수 있다. 
- **동적 배열 구현**: `ArrayList`는 요소를 추가하거나 제거할 때 배열의 크기를 동적으로 변경한다.
- **컬렉션 프레임워크의 일부**: `List` 인터페이스의 구현체이다.


## 간단한 구현법

`ArrayList`의 기능은 방대하다. 해당 아티클에서는 동적 배열로서의 `ArrayList`에 집중하기 위해
`Generic`, `Iterator`, `modCount` 등 편의 및 성능을 위한 메서드들은 배제하고 구현하였다.

`Java17`의 `ArrayList`를 참고하여 진행했으나, 가독성등의 이유로 일부 수정한 부분이 있다.

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

### 클래스 필드 정의

``` java
public class SimpleArrayList implements SimpleList {  
  
    private static final int DEFAULT_CAPACITY = 10;  
    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8; 
    private static final String[] EMPTY_ELEMENTDATA = {};  
  
  
    private String[] elementData;  
    private int size;

    // ...
}
```

- DEFAULT_CAPACITY
	- 배열이 생성 될 때의 기본 용량 (Java8에서부터 17까지는 10)
- MAX_ARRAY_SIZE
	- 할당할 수 있는 배열의 최대 크기 
	- 일부 VM들은 배열에 헤더 단어를 예약하기 때문에 8을 빼준다.
- EMPTY_ELEMENTDATA
	- 아무 것도 없는 빈 배열 
- DEFAULTCAPACITY_EMPTY_ELEMENTDATA
	- 아무 것도 없는 빈 배열이지만 `EMPTY_ELEMENTDATA` 와는 의미론적 차이 존재
	- 해당 아티클에서는 구현하지 않음
- elementData
	- `SimpleArrayList`에 `add()` 되는 `String`을 담는 배열
	- 실제 `ArrayList`에서는 `Object` 배열 사용
- size
	- elementData 배열에 담긴 요소의 총 갯수
	- capacity는 배열에 요소가 담길 수 있는 전체 용량을 의미하고, size는 요소의 갯수를 의미한다.


### 생성자 정의

``` java

public class SimpleArrayList implements SimpleList {  

    // ...

	public SimpleArrayList() {  
	    this.elementData = new String[DEFAULT_CAPACITY];  
	    this.size = 0;  
	}  
  
	public SimpleArrayList(int initialCapacity) {  
	    if (initialCapacity < 0) {  
	        throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);  
	    }  
  
	    if (initialCapacity == 0) {  
	        this.elementData = EMPTY_ELEMENTDATA;
	        this.size = 0;  
	        return;  
	    }  
  
	    this.elementData = new String[initialCapacity];  
	    this.size = 0;  
	}
	
    // ...
    
}
```

- 파라미터가 없는 생성자
	- 기본 용량으로 초기화
- 파라미터가 0보다 작은 경우
	- 예외 발생
- 파라미터가 0인 경우
	- 아무 것도 없는 빈 배열
- 파라미터가 0보다 큰 경우
	- 입력받은 파라미터 만큼의 용량으로 배열 생성


### 동적 배열 구현

`ArrayList`와 배열의 가장 큰 차이점은 용량이 동적으로 변경할 수 있는지 여부이다.
다음 코드는 동적으로 `ArrayList`의 용량을 변경하는 메서드이다.

``` java

public class SimpleArrayList implements SimpleList {  

    // ...

	private String[] grow() {  
	    return grow(size + 1);  
	}  
  
	private String[] grow(int minCapacity) {  
	    int newCapacity = calculateNewCapacity(minCapacity);  
  
	    return elementData = Arrays.copyOf(elementData, newCapacity);  
	}  
  
  
	private int calculateNewCapacity(int minCapacity) {

		if (minCapacity < 0) {  
		    throw new OutOfMemoryError();  
		}
		
	    int oldCapacity = elementData.length;  
	    int newCapacity = oldCapacity + (oldCapacity >> 1);
  
	    if (newCapacity - minCapacity <= 0) {  
	        return adjustCapacity(minCapacity);  
	    }  
  
	    return ensureMaxCapacityLimit(minCapacity, newCapacity);  
	}  
  
	private int adjustCapacity(int minCapacity) {  
	    if (elementData == EMPTY_ELEMENTDATA) {  
	        return Math.max(DEFAULT_CAPACITY, minCapacity);  
	    }  
	    return minCapacity;  
	}  
  
	private int ensureMaxCapacityLimit(int minCapacity, int newCapacity) {  
	    if (newCapacity - MAX_ARRAY_SIZE <= 0) {  
	        return newCapacity;  
	    }  
	    return hugeCapacity(minCapacity);  
	}  
	  
	private int hugeCapacity(int minCapacity) {  
	    if (minCapacity > MAX_ARRAY_SIZE) {  
	        return Integer.MAX_VALUE;  
	    }  
	    return MAX_ARRAY_SIZE;  
	}
	
    // ...
    
}  
```

- `private String[] grow(int minCapacity)`
	- 주어진 최소 용량 (minCapacity)을 충족 하기 위해 내부 배열의 크기 증가
	- `calculateNewCapacity` 메소드를 호출하여 새로운 용량 계산
	- `Arrays.copyOf`를 사용하여 기존 배열을 새로운 크기로 복사 후, 새 배열을 `elementData`에 할당
- `private int calculateNewCapacity(int minCapacity)`
	- `minCapacity`가 음수인 경우, `OutOfMemoryError` 발생
	- 현재 배열의 용량(`oldCapacity`)을 기반으로 새로운 용량(`newCapacity`) 계산
	- 새 용량은 비트 시프트 연산을 통해 현재 용량의 1.5배로 설정
	- 새 용량이 `minCapacity`보다 작으면, `adjustCapacity` 메소드 호출
	- 그렇지 않으면, `ensureMaxCapacityLimit` 메소드 호출
- `private int adjustCapacity(int minCapacity)`
	- 만약 내부 배열이 비어있을 시, (`EMPTY_ELEMENTDATA`) `DEFAULT_CAPACITY`와 `minCapacity` 중 더 큰 값 반환
	- 그렇지 않으면, `ensureMaxCapacityLimit` 메소드를 호출하여 최대 용량 제한 확인
- `private int ensureMaxCapacityLimit(int minCapacity, int newCapacity)`
	- `newCapacity`가 `MAX_ARRAY_SIZE`를 초과하지 않는 경우, `newCapacity` 반환
	- 그렇지 않으면, `hugeCapacity` 메소드 호출
- `private int hugeCapacity(int minCapacity)`
	- `minCapacity`가 `MAX_ARRAY_SIZE`를 초과하는 경우, `Integer.MAX_VALUE` 반환
	- 그렇지 않으면 `MAX_ARRAY_SIZE` 반환


### add 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...

	@Override  
	public boolean add(String value) {  
	    if (size == elementData.length) {  
	        elementData = grow();  
	    }  
	  
	    elementData[size] = value;  
	    size = size + 1;  
	    return true;  
	}  
	  
	@Override  
	public void add(int index, String value) {  
	    Objects.checkIndex(index, size + 1);  
	    if (size == elementData.length) {  
	        elementData = grow();  
	    }  
	  
	    if (size - index > 0) {  
	        System.arraycopy(  
	                elementData, index,  
	                elementData, index + 1,  
	                size - index  
	        );  
	    }  
	  
	    elementData[index] = value;  
	    size = size + 1;  
	}
	
    // ...
    
}  
```

- `public boolean add(String value)`
	- 리스트의 끝에 새로운 요소 추가
	- 용량 확인 후 배열이 가득 찼다면, `grow()` 메서드 호출
	- 마지막 위치에 요소 추가
	- size 증가
- `public void add(int index, String value)`
	- 지정된 `index`에 새로운 요소 삽입
	- 인덱스 유효성 검사
	- 용량 확인 후 배열이 가득 찼다면, `grow()` 메서드 호출
	- `System.arraycopy()`를 이용하여, 지정된 `index` 이후에 요소가 있을 시 그 요소들을 오른쪽으로 한 칸씩 이동하여 새 요소를 위한 공간 확보
	- 지정된 `index`에 요소 추가
	- size 증가

### remove 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...
    
	@Override  
	public boolean remove(String value) {  
	    int foundIndex = IntStream.range(0, size)  
	            .filter(i -> Objects.equals(value, elementData[i]))  
	            .findFirst()  
	            .orElse(-1);  
	  
	    if (foundIndex != -1) {  
	        removeElementAt(foundIndex);  
	        return true;  
	    }  
	    return false;  
	}  
	  
	@Override  
	public String remove(int index) {  
	    Objects.checkIndex(index, size);  
	  
	    String oldValue = elementData[index];  
	    removeElementAt(index);  
	  
	    return oldValue;  
	}  
	  
	private void removeElementAt(int index) {  
	    int numMoved = size - index - 1;  
	    if (numMoved > 0) {  
	        System.arraycopy(  
	                elementData, index + 1,  
	                elementData, index,  
	                numMoved  
	        );  
	    }  
	    size = size - 1;  
	    elementData[size] = null;  
	}
	
    // ...
    
}  
```

- `public boolean remove(String value)`
	- 주어진 `value`와 일치하는 첫 번째 요소를 리스트에서 제거
	- `IntStream.range(0, size)`를 사용하여 0부터 `size - 1`까지의 인덱스에 대한 스트림을 생성합니다.
	- `filter` 와 `Objects.equals` 를 사용하여 `value`와 일치하는 요소의 인덱스 탐색
	- `findFirst` 메소드를 사용하여 일치하는 첫 번째 요소의 인덱스 반환. 만약 일치하는 요소가 없을 시`-1` 반환
	- 일치하는 요소가 있으면 (`foundIndex != -1`), `removeElementAt` 메소드를 호출하여 해당 인덱스의 요소 제거 후 `true` 반환
	- 일치하는 요소가 없을 시 `false` 반환
- `public String remove(int index)`
	- 지정된 `index`에 있는 요소를 리스트에서 제거 후, 제거된 요소 반환
	- `Objects.checkIndex` 메소드를 호출하여 `index`가 유효한 범위 내에 있는 지 검증
	- `removeElementAt` 메소드를 호출하여 `index` 위치의 요소 제거
	- 제거된 요소의 값 반환
- `private void removeElementAt(int index)`
	- 지정된 `index`에 있는 요소를 리스트에서 제거
	- `numMoved`를 계산하여 `index` 이후에 남아있는 요소 수량 파악
    - 제거된 요소의 공간을 채우기 위해, `System.arraycopy` 메소드를 사용하여 `index` 이후의 모든 요소를 한 칸씩 앞으로 이동
    - `size` 1 감소 및 마지막 요소 `null`로 설정하여 참조 제거

### get / set 구현

``` java
public class SimpleArrayList implements SimpleList {  

    // ...
    
	@Override  
	public String get(int index) {  
	    Objects.checkIndex(index, size);  
	  
	    return elementData[index];  
	}  
	  
	@Override  
	public String set(int index, String value) {  
	    Objects.checkIndex(index, size);  
	  
	    String oldValue = elementData[index];  
	    elementData[index] = value;  
	  
	    return oldValue;  
	}
	
    // ...
    
}  
```

- `public String get(int index)`
	-  지정된 `index`에 있는 요소 반환
	- `Objects.checkIndex(index, size)`를 통해 주어진 `index` 검증
	- 유효한 `index`의 경우, `elementData[index]`를 사용하여 해당 인덱스의 요소 반환
- `public String set(int index, String value)`
	- 지정된 `index`에 있는 요소를 새로운 `value`로 설정 후 이전 값 반환
	- `Objects.checkIndex(index, size)`를 통해 주어진 `index` 검증
    - `elementData[index]`를 사용하여 이전 값을 `oldValue`에 저장
	- `elementData[index]`에 새로운 `value` 설정
	- 이전 값을 `oldValue`로 반환

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
	    for (int i = 0; i < size; i++) {  
	        elementData[i] = null;  
	    }  
	  
	    size = 0;  
	}
	
	@Override  
	public int indexOf(String value) {  
	    for (int i = 0; i < size; i++) {  
	        if (Objects.equals(value, elementData[i])) {  
	            return i;  
	        }  
	    }  
	    return -1;  
	}  
	  
	@Override  
	public String toString() {  
	    if (elementData == null) {  
	        return "null";  
	    }  
	    int iMax = size - 1;  
	    if (iMax == -1) {  
	        return "[]";  
	    }  
	  
	    StringBuilder b = new StringBuilder();  
	    b.append('[');  
	    for (int i = 0; ; i++) {  
	        b.append(elementData[i]);  
	        if (i == iMax) {  
	            return b.append(']').toString();  
	        }  
	        b.append(", ");  
	    }  
	}
	
    // ...
    
}  
```

- `public void clear()`
	- 메모리 할당을 새로 하지 않기 때문에 초기 메모리 사용량 유지
	- 큰 리스트의 경우, 모든 요소를 `null`로 설정하는 데 `O(n)`의 시간 복잡도 소요
	- 가비지 컬렉터가 더 이상 참조되지 않는 객체 회수 가능
	- 빈 배열을 넣는 방법으로도 구현 가능하나, 작은 리스트에서는 불필요한 메모리 할당 및 가비지 컬렉션 오버헤드 발생 가능
- `public String toString()`
	- `AbstractCollection`에서는 `iterator()`를 통해 구현
	- 현재 `iterator()`를 구현하지 않아 `Arrays`의 `String toString(Object[] a)`을 기반으로 구현