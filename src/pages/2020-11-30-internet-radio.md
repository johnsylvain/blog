---
path: "/build-an-internet-radio-station"
title: "How to build an internet radio station"
date: "2020-11-30"
tag: Node
spoiler: Let's build an internet radio station.
---

In my [previous post](/music-streaming) we learned how to stream an audio file with Node.js. In this post we are going to expand upon that to build our own internet radio station.

By the end, we'll end up with a Node server that streams a synchronized audio file to all connected clients.

## Demo

This post is inspired by my own internet radio station, Lounge FM. You can view the site on [lounge.cool](https://lounge.cool) and the source code [on GitHub](https://github.com/johnsylvain/loungefm). We will only be talking about the streaming engine, not the frontend UI.

## Preperation

We will be using [ffmpeg](https://ffmpeg.org), a CLI tool for converting multimedia files between formats. We can install ffmpeg with Homebrew:

  ```shell
  brew install ffmpeg
  ```

We will also need several npm dependencies for running our Node app:

  ```shell
  yarn add polka @polka/send-type compression throttle @dropb/ffprob
  ```

We'll need several mp3 files containing the tracks for our radio station. These can be placed in a `tracks` directory in the root of our project. mp3 files work best because they hold metadata about the track (artist, artwork, comments) that can be used in the UI.

## Setup the Node server

We will be using [polka](https://github.com/lukeed/polka/) in this tutorial, but any node framework should work. We will set up one route at `/stream` which is where the live stream will be available at.

```js
// index.js

const polka = require('polka');
const send = require('@polka/send-type');
const compression = require('compression');

const app = polka();

app.use(compression());

app.get('/stream', (req, res) => {
  // TODO: connect client to stream
  send(req, 200, { status:'ok' });
});

app.listen(8000, () => {
  console.log('[server] running on localhost:8000');
});
```

## Scaffold the streaming engine

This is where most of the logic for our radio station stream will live. We can start by creating a `Queue` class with some placeholder methods.

```js
// queue.js

class Queue {
  constructor() {
    this.songs = [];
  }

  async loadSongs() {}

  broadcast() {}

  addClient() {}

  removeClient() {}

  async getNextSong() {}

  async play() {}
}
```

## Load songs into the queue

We need to import `path` and `fs` to access the file system to read the file names.

```js
const path = require('path');
const fs = require('fs');

class Queue {
  // ...

  async loadSongs(dir) {
    return new Promise((resolve) => {
      const dir = path.join(__dirname, 'music');
      fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        this.songs = files
          .filter((file) => {
            const parts = file.name.split(".");
            return parts[parts.length - 1] === "mp3";
          })
          .map((file) => `${dir}/${file.name}`);
        resolve(this.songs);
      });
    });
  }

  // ...
}
```

## Loading up the next song in the queue

To cycle through songs in our queue, we will take the first item from the `this.songs` list, extract metadata using `ffprobe`, then push it back to the end of the list.

```js
const path = require('path');
const fs = require('fs');
const ffprobe = require('@dropb/ffprobe');

class Queue {
  // ...

  async getNextSong() {
    const url = this.songs.shift();
    let data;
    try {
      data = await ffprobe(url);
    } catch (e) {
      console.log(e);
      return await this.getNextSong()
    }

    const currentSong = {
      url,
      artist: data.format.tags.artist,
      title: data.format.tags.title,
      description: data.format.tags.comment,
      duration: Math.floor(parseFloat(data.format.duration)),
      bitRate:
        data && data.format && data.format.bit_rate
          ? parseInt(data.format.bit_rate)
          : 128000,
    };

    this.currentSong = currentSong;
    this.songs.push(url);
    return currentSong;
  }

  // ...
}
```

Most of the values in `currentSong` are optional, except `bitRate`. We need to extract the mp3 file's bit rate so that we can accuratly throttle the stream. This is what allows us to stream the file in a synchronized manner.

`ffprobe` allows us to access the metadata of the mp3 files, it uses `ffmpeg` under the hood.

## Managing connected clients

When a client connects to the server we want to start streaming the current song from the queue. To accomplish this, we will need to keep track of all clients connected to the server in some type of data structure. Let's create a property called `clients` on our `Queue` class and initialize it to an empty `Map`.

```js
class Queue {
  constructor() {
    this.songs = [];
    this.clients = new Map();
  }

  // ...
}
```

A `Map` is similar to a standard JavaScript object. For each client that connects we will create a new UUID for them, along with their own `PassThrough` stream.

A `PassThrough` stream is readable and writeable. This is great for our use case because we want to write to a stream and allow our clients to read it in real time.

```js
const uuid = require('uuid/v4');
const { PassThrough } = require('stream');

class Queue {
  constructor() {
    this.songs = [];
    this.clients = new Map();
  }
  // ...

  addClient() {
    const client = new PassThrough();
    const id = uuid();
    this.clients.set(id, client);
    return { id, client };
  }

  removeClient(id) {
    this.clients.delete(id);
  }

  // ...
}
```

## Broadcasting the track

Below we will fill in the `broadcast` and `play` methods.

```js
class Queue {
  // ...

  broadcast(chunk) {
    for (const [, client] of this.clients) {
      client.write(chunk);
    }
  }

  async play() {
    if (this.songs.length) {
      const song = await this.getNextSong();
      const stream = fs.createReadStream(song.url);
      const throttle = new Throttle({
        bps: song.bitRate / 8,
        chunkSize: 512,
      });

      stream
        .pipe(throttle)
        .on("data", (chunk) => this.broadcast(chunk))
        .on("end", () => this.play())
        .on("error", () => this.play());
    }
  }

  // ...
}
```

Breakdown of the `play` method:

1. Get the current song (via `this.getCurrentSong`)
1. Create a read stream for the current song.
1. Create a throttle with the bytes per second. We use the `bitsPerSecond` value we obtained from `ffprobe`.
1. Broadcast the stream data to `this.broadcast`.

The throttle is crucial to this app working. Throttling the stream will create the effect of the stream being real time. When a new client connects to our server, they start streaming the latest chunk of data instead of starting from the beginning.

## Wiring it up

Inside of our main server file, we need to initialize the queue and load the songs into the queue before booting up the server.

```js
const polka = require('polka');
const send = require('@polka/send-type');
const compression = require('compression');
const Queue = require('./queue');

(async () => {
  const queue = new Queue();
  await queue.loadSongs();
  const app = polka();

  app.use(compression());

  app.get('/stream', (req, res) => {
    const { id, client } = queue.addClient();
    send(res, 200, client, {
      "Content-Type": "audio/mpeg",
      "Transfer-Encoding": "chunked",
    });

    req.on("close", () => {
      queue.removeClient(id);
    });
  });

  app.listen(8000, () => {
    console.log('[server] running on localhost:8000');
  });
})();
```

When a user connects to the `/stream` route, we register them as a client in our client `Map` via `queue.addClient`. `client` is our `PassThrough` stream which we send as the response. When the client closes the request (closes the tab, browser, etc) we remove the client from the list of clients.


## Considerations

Here's a list of ideas to expand upon the project:

* Add a shuffle method to the queue.
* Implement a way to upload new songs into the queue.
* Compress mp3 files for smaller stream sizes.
* Build an endpoint to obtain the current song information.