# The Big Incomplete Book of Dev

The latest "published" version can be accessed at http://solid-interactive.github.io/solid-book/ .

To edit the book go to: https://github.com/Solid-Interactive/solid-book .

The most recent version can be accessed by cloning and building locally:

```shell
npm install -g gitbook-cli
git clone git@github.com:Solid-Interactive/solid-book.git
cd solid-book
gitbook install
(sleep 3; open http://localhost:4000) &; gitbook serve
```

`npm run dev` will do the last line from the above

To deploy push a commit to the `master` branch.

## Organization

Topics are roughly organized into a hierarchy by subjects. Of course
this organization doesn't always work completely. Sometimes a page could
fit into more than one topic. This is why we also tag each page.

## [Tags](/zzzz.md)

[Add tags as a line on a given page](https://github.com/billryan/gitbook-plugin-tags#add-tags-in-page)

## Links

For links PhpStorm has good auto-completion.

## Build

Sometimes, locally, it takes on diff for the tags to show up.
