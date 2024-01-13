---
category: "idea"
title: "블로그를 만들게 되기까지"
date: 2024-01-01
author: "준팍"
image: "thumbnail.jpg"
description: 왜 그런 짓을 하셨죠?
published: true
tags: [ "React", "JSX", "Frontend" ]
---
# 진짜 제목

``` java
const hello = new Hello();
```

JSX, or JavaScript XML, is a syntax extension for JavaScript often used with React to describe what the UI should look like. 
By using JSX, you can write HTML structures in the same file as your JavaScript code. This integration of markup with logic makes building React components more intuitive and accessible.

## What is JSX?

At its core, JSX is a syntax extension for JavaScript. It looks like HTML and can be used within JavaScript files.
Despite its HTML-like appearance, JSX is fully integrated with JavaScript.

Here’s a simple example of JSX:

```jsx
const element = <h1>Hello, world!</h1>;
```

This code defines a constant `element` that stores a JSX expression. When used with React, this expression will render
a `<h1>` element with the text “Hello, world!” on the web page.


## Why Use JSX?

### 나도 알 수가 없다...

The main advantage of JSX is its readability and expressiveness. Since it resembles HTML, developers who are familiar
with web development can easily understand and use JSX in their React applications.

JSX also allows for the dynamic rendering of content. You can embed JavaScript expressions inside braces `{}` within
JSX. This feature lets you integrate logic and UI seamlessly.

For example:

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
    console.log('this line is marked as deleted')
    // This line and the next one are marked as inserted
    console.log('this is the second inserted line')

    return 'this line uses the neutral default marker type'
}
```

This will render “Hello, React Developer” on the screen.

## Components and JSX

React components can return JSX to define their UI structure. Components are the building blocks of React applications,
and JSX provides a concise and readable way to compose these components.

Consider a simple component:

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
```

This component, `Welcome`, takes a `props` object and returns a JSX expression that dynamically inserts the `name`
property into the rendered output.