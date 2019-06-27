---
path: "/console-logging"
title: "console.log tricks"
date: "2019-06-26"
tag: Dev
spoiler: Make console.log a little nicer.
---

If you're like me, you often reach for `console.log` for debugging your JavaScript applications. Here's a few tricks to make logging data a little nicer.

## Built-in methods

* [`console.count`][1]: prints a string with the number of calls
* [`console.table`][2]: prints an array of data in a tabular format
* [`console.group`][3]: organize related logs in a nested block.
* [`console.time`][4]: start a timer to track how long an operation takes.

## Easy labeling

The following is the easiest way to log out some data. The downside is that logged out data is not labeled in the console.

```js
const name = 'John';

console.log(name); //=> 'John'
```

The solution? Assuming you are logging out variables, wrap them in an object.

```js
const firstName = 'John';
const lastName = 'Sylvain';

console.log({ firstName, lastName });
//=> { firstName: 'John' , lastName: 'Sylvain' }
```

## Inline logging

Consider the following example. You may want to log the data in the `filter` method.

```js
data
  .map(item => item.name)
  .filter(Boolean)
  .reduce(...);
```

`console.log()` has a return value of `undefined` when called. When used with a logical or operator, you can log the data inline.

```js
data
  .map(item => item.name)
  .filter(console.log || Boolean)
  .reduce(...);
```

This could be useful in functional React components.

```jsx
const Component = (props) => console.log({ props }) || (
  <div>{props.name}</div>
);
```


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Console/count
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Console/table
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Console/group
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Console/time