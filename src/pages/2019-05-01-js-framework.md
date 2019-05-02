---
path: "/js-framework"
title: "Lessons learned: Building a JS Framework"
date: "2019-05-01"
tag: Dev
spoiler: What I learned from building my own JavaScript framework.
---

In October 2017 I started building my own JavaScript framework. It was not my intention to create the next React or Angular. Instead, I wanted to gain a better understanding of the different pieces that go into building one.

Since then, I've continued to develop it and it has become a fun tool for me to use. I ended up releasing my framework under the name [Kobra](https://npm.im/kobra) and is available on NPM.

Below are the top 3 concepts that I learned from building the framework.

## Virtual DOM

Lots of frameworks say they use a "Virtual DOM," but what does that mean? Turns out it's a way to represent the DOM as a JavaScript object in the shape of a tree. The benefit being the ability to traverse this structure to diff and patch any changes.

My first exposure to learning how a Virtual DOM works was [a talk by Jason Miller](https://www.youtube.com/watch?v=LY6y3HbDVmg) (the creator of Preact). Jason does a great job of explaining how JSX tags get transpiled to function calls, a simple shape of a Virtual DOM node, and a simple DOM diffing algorithm. I used this as the initial basis for my Virtual DOM, but have since iterated on it.

## Browser Routing

I wanted to include a router in my framework, so I had to learn how the browser handles changes to the history state.

To do this, I used the `PopState` event. Navigating through pages dispatches a `PopState` event, and the Kobra router listens for these events via `popstate`.

To have dynamic routing, I used a JavaScript package called [matchit](https://www.npmjs.com/package/matchit). This provides a simple interface to parse and match URLs, allowing for express style routing. This is the only external package that I used for building the framework.

## State Management

State management turned out to be easy to put in place. Following the Redux model, actions are dispatch from the components, and a reducer updates the state accordingly. I was able to do this in about [13 lines of code](https://github.com/johnsylvain/kobra/blob/master/src/kobra.js#L24-L37).

## Putting it in action

You can't improve something if you don't use it. I learned this by building a few applications with the framework. I encountered bugs in the diffing algorithm, as well as more functionality that I needed.

So far, I have built my [music production site](https://music.sylvain.win) and a [simple todo app](https://todos.sylvain.win) with it. Currently, I'm working on building a full-stack application with Kobra handling everything frontend related.