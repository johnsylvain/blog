---
path: "/url-parser"
title:  "The simplest URL parser"
date:   "2019-01-27"
tag: JavaScript
spoiler: No need for Regex here.
---

At some point you may have come across the need to extract a segment of a URL. Implementing a Regex matcher can be a pain,  so here's a simple trick in just a few lines of code. *Note:* This will not work in Node.

```js
const parser = document.createElement('a');
parser.href = 'http://example.com:3000/pathname/?search=test#hash';

parser.protocol //=> http:
parser.hostname //=> example.com
parser.port     //=> 3000
parser.pathname //=> /pathname/
parser.search   // => ?search=test
parser.hash     // => #hash
parser.host     // => example.com:3000
```

Leveraging the HTML anchor tag, we can use its API to extract the necessary components of the URL.

## A wrapper

```js
function parseURL(url) {
  const parser = document.createElement('a');
  parser.href = url;

  return [
    'protocol',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash',
    'host'
  ].reduce((acc, cur) => ({ ...acc, [cur]: parser[cur] }), {});
}
```