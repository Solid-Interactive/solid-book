
# Version Control

While there are multiple options for version control, no matter your choice, there
are a few things you must be able to accomplish:

1. Keep track of changes to the code base
2. Keep track of the latest stable and semi stable versions of the code base
3. Keep track of feature sets
4. Manage the release workflow by being able to isolate code ready for realease
5. Quickly create new releases from (grab bag) mixtures of feature sets
6. Use version control to find the commit that broke the app
7. Reuse code in multiple projects

This guide will cover how to achieve the above using git and gitflow.

## Keeping track of the changes in the code base

This just means committing code. It is important to commit code often and in small
chunks. This makes it easier to debug and isolate later.

For example if you have a large commit of 30 files that breaks something.

## Keep track of the latest stable and semi stable versions of the code base

The latest stable release should always be in master. The master branch itself
should be made up of a sequence of nothing but "deploy" commits - that is commits
that were actually deployed or used for a deploy.

This is important since it allows very easy "undos." For example if the latest
code on master doesn't actually work, a quick `reset --hard HEAD~1` should guarantee
the previous thing that was on production.

The latest semi stable release should be on develop. This is essentially code that
you think should work but probably still has to get tested. Usually the staging
environment would contain the develop branch.

## Keep track of feature sets

As you begin work on a feature set, you should branch from develop and work on the
feature: `get checkout -b feature/new-feature-set`. Code on feature branches are
not assumed to be "working." When a feature set is complete it should be merged
back into `develop`:

```
git merge --no-ff feature/new-feature-set
```

Using a `--no-ff` merge is very important. First it keeps working commits working.
Doing a fast forward merge may break working commits, by "splicing" a breaking
commit before it. Additionally a `--no-ff` merge keeps the main code for each
feature visually separated for inspection.

Here is an example that illustrates both points:

### The original code:

```
d develop HEAD
|
c
| b feature/new
|/
a
```

If we do a fast forward this is how things will look:

```
d
|
c
|
b
|
a
```

The above doesn't preserve in the network graph (`git log --graph` or use Sourcetree)
that commit b was part of a feature branch. Additionally if commit `b` breaks things,
commit `c` and `d` has now gone from a working to a broken commit.

If we do a `--no-ff`

```
e
|\
d |
| |
c |
| b
|/
a
```

Here the network graph clearly shows that `b` is separate. Additionally commits
d and c don't break even if the newly created `e` commit is broken by `b`.

There are many customization you can do the `--graph` outpu to make, but probably
the easiest thing to do is to use a gui such as Sourcetree.
