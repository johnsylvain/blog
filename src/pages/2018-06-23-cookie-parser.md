---
path: "/cookie-parser"
title:  "A simple cookie parser"
date:   "2018-06-23"
tags: [ javascript ]
---

I recently found a need to desearlize the browser cookie string into a JavaScript object. I didn't want to introduce a 3rd party library, so I created my own function that does just that.

This is what I needed the function to produce:

```js
document.cookie //=> 'a=1; b=2'

deserialize(document.cookie) //=> { a: 1, b: 2 }
```

## The parser

```js
function deserialize(cookieString) {
  return cookieString
    .split('; ')
    .filter(Boolean)
    .reduce((acc, cur) => {
      const c = cur.match(/(^.*?)=(.*$)/);
      return { ...acc, [c[1]]: c[2] };
    }, {});
}
```

The function is pretty simple. We just split the string into an array, filter out any false values, then convert the array into an object with the proper keys/values.

The reduce method is where most of the logic lies. We create two capture groups in the regular expression to obtain the key and value, then assign them to the accumulator object.