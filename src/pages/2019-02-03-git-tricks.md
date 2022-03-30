---
path: "/git-tricks"
title: "Git tricks"
date: "2019-02-03"
tag: "Git"
spoiler: "A collection of useful git tricks"
---

Here's a (growing) collection of git commands/tricks that I find useful. While there are many more, these are ones that I use on a daily basis.

## General

1. `git checkout -`: switch to the previous branch. Very similar to `cd -`

1. `git checkout .`: discard all unstaged changes. This action is irreversible.

1. `git add -p`: Interactively stage files. Similar experience to `git rebase -i`

1. `gitignore <language>`: This is a custom function you can add to your bashrc. Please refer to [gitignore.io](https://gitignore.io) for more usage information.

```bash
  gitignore() {
    curl -L -s "https://www.gitignore.io/api/$1" >> .gitignore
  }
```

## Handling mistakes

1. `git reset HEAD~1`: "un-commit" your last commit

1. `git branch -m <original> <target>`: move branch to new location. Useful if you misspell a branch name. Similar to `mv`. If you have already pushed the bad branch, run `git push origin --delete <original>` then `git push origin <target>`

1. `git commit --amend`: add changes to the previous commit. If changes have already been published, use `git push -f` to force push the changes to the remote origin.

## Logging

1. `git log --oneline`: Single line git log.

1. `git log --graph`: log git history in graph form.

## Addons

- [git-cleanup](https://github.com/johnsylvain/git-cleanup): delete all local merged branches
- [git-standup](https://github.com/kamranahmedse/git-standup): Recall what you did the previous day
