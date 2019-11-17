---
path: '/functional-box'
title: 'Functional Concepts: Box'
date: '2019-11-17'
tag: Functional JavaScript
spoiler: A gentle introduction to functional programming concepts.
---

This is the first post of an ongoing series for writing more functional JavaScript code.

Consider the following:

```js
import { format } from 'date-fns';

const date = new Date();
const formattedDate = format(date, 'YYYY-MM-DD');
const apiUrl = `/api/posts/${formattedDate}`;

fetch(apiUrl);
```

This code creates a url to an api by performing a couple transformations.

It works for the time being, but does not lend itself well towards future iterations. What if we needed to add more formatting? Error handling? Or wanted to resuse parts of this logic elsewhere?

## A functional approach

We can rewrite the above code taking a more functional approach.

```js
import { format } from 'date-fns';

const apiUrl = [new Date()]
  .map(d => format(d, 'YYYY-MM-DD'))
  .map(d => `/api/posts/${d}`)[0];

fetch(apiUrl);
```

Here we are using an Array to hold our data and map over it. By mapping, we are able to create pure functions that have single responsibilities.

## Box

We can create our own data structure with an API that holds single values.

```js
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x)
});
```

`Box` gives us two methods: `map` and `fold`. `map` behaves the same as our Array implementation, except it returns a new instance of `Box`.

`fold` behaves very similarly to `map`, with the difference being is does not return a new instance of `Box`. This solves the problem of having to pick off the first value of the array from our first implementation. It allows us to pull the value out of our `Box` in one go.

```js
import { format } from 'date-fns';

const apiUrl = Box(new Date())
  .map(d => format(d, 'YYYY-MM-DD'))
  .fold(d => `/api/posts/${d}`);

fetch(apiUrl);
```
