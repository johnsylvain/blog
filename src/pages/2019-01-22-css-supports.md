---
path: "/css-supports"
title:  "CSS @supports in JavaScript"
date:   "2019-01-22"
tags: [ javascript, css ]
---

CSS `@supports` is pretty handy for setting up fallback for older browsers when using new CSS features. But what if you need to determine browser support in your JavaScript code? Here's what that looks like:

```js
CSS.supports('position', 'sticky');
```

We can make a small wrapper around this to ensure `CSS` and `supports` are defined.

```js
function supports(key, value) {
  return CSS && CSS.supports && CSS.supports(key, value);
}
```