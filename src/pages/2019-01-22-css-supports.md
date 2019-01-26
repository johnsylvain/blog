---
path: "/css-supports"
title:  "CSS @supports in JavaScript"
date:   "2019-01-22"
tag: JavaScript
spoiler: Improve browser support with CSS supports.
---

CSS `@supports` is pretty handy for setting up fallback for older browsers when using new CSS features. But what if you need to determine browser support in your JavaScript code? Here's what that looks like:

```js
CSS.supports('position', 'sticky');
```

## An example

Consider the need to apply styling via JavaScript. You might need to determine a browser specific prefix, which could look like the following:

```js
const prefix = CSS.supports('position', 'sticky')
    ? 'sticky'
    : CSS.supports('position', '-webkit-sticky')
      ? '-webkit-sticky'
      : '';
```

## Caveats

* `CSS.supports` and `@supports` is not supported in IE.
* I recommend against using `not` when using either `CSS.supports` or `@supports`, especially when targeting older browsers.