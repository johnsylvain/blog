---
path: "/javascript-media-queries"
title: "JavaScript media queries"
date: "2019-11-07"
tag: JavaScript
spoiler: Performant media queries in JavaScript.
---

CSS Media queries are great, and thanks to `matchMedia` we can use them in JavaScript just as easily.

[**MDN Reference**](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

## A helper function

This is a handy function for attaching listening to a media query, and a cleanup function.

```js
function mediaQuery(query, handler) {
  const media = window.matchMedia(query);
  const listener = () => {
    if (media.matches) {
      handler();
    }
  };
  media.addListener(listener);

  return () => media.removeListener(listener);
}
```

## Examples

Detecting screen size:

```js
const unsubscribe = mediaQuery('(max-width: 768px)', () => {
  console.log('window is less than 768px'):
});

unsubscribe();
```

Detecting dark mode preference:

```js
const unsubscribe = mediaQuery('(prefers-color-scheme: dark)', () => {
  console.log('use dark mode'):
});

unsubscribe();
```