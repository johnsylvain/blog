---
path: "/music-streaming"
title: "Music streaming with Node.js"
date: "2020-04-22"
tag: Node
spoiler: Let's make a primitive music streaming service.
---

Streams are not a new concept, even with modern products like Netflix and Spotify. In this post we'll create a primitive music streaming api with Node.js.

## Streams 101

Streams are pretty handy. I/O in Node is asynchronous, calling for lots of callbacks or promise chaining. Consider reading data from a file:

```js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');

fs.readFile(file, (err, data) => {
  process.stdout.write(data);
});
```

While this works, it requires us to only access `data` within the `readFile` callback, creating callback hell. The entire contents of the file must be read before sent to the callback. This can make for a poor user experience with large files.

Enter streams. Streams allow us to read data in chunks and pipe it elsewhere as we get the data. Here's the same code from above, but written with streams.

```js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data.txt');

const stream = fs.createReadStream(file);
stream.pipe(process.stdout);
```

The key difference here is that as we recieve data from our stream, we'll write it to `process.stdout` as we get it, instead of all at once.

This can be useful for music streaming, since we don't want to wait for the entire audio file to be buffered, instead we want it to start playing immediately and buffered progressivly.

## Project setup

We'll use `nodemon` for development, but we will build everything else with vanilla Node.js.

```bash
yarn init
yarn add nodemon --dev
touch index.js
```

## Creating a server

We will use Node's `http` module to do this. This should be very familiar if you've written any Node app.

```js
const http = require('http');
const PORT =  1337;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end({ status: 'ok' });
});

server.listen(PORT, err => {
  console.log(`[server] Listening on :${PORT}`)
});
```

## Creating a stream

For this app, I have several Waveform (wav) files in an `/audio` directory within the project. We want to create a stream for those files, and then pipe the output to the server response. Luckily `req` and `res` are both streams!

```js
const http = require('http');
const PORT =  1337;

const server = http.createServer((req, res) => {
  const file = path.join(__dirname, 'audio/file.wav');
  const stream = fs.createReadStream(file);
  stream.pipe(res);
  res.writeHead(200, { 'Content-Type': 'audio/wav' });
});

server.listen(PORT, err => {
  console.log(`[server] Listening on :${PORT}`)
});
```

If you run `yarn nodemon index.js` and access `localhost:1337` you should start to hear your audio file playing. If you open the network tab, you should see a request to your audio file that is constently open. The server response is recieving the audio file data as it's buffered. Pretty cool.

## Future considerations

* Use a Node framework to make the server more robust.
* Add file compression to save bandwidth.
* Store audio files in S3 (or similar).

