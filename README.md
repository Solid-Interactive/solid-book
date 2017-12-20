# The Big Incomplete Book of Dev

The latest "published" version can be accessed at http://solid-interactive.github.io/solid-book/ .

## Contributing

To edit the book go to https://github.com/Solid-Interactive/solid-book and edit the markdown pages. CI will publish
the new version.

## Organization

Topics are roughly organized into a hierarchy by subjects. Of course
this organization doesn't always work completely. Sometimes a page could
fit into more than one topic. This is why we also tag each page.

## [Tags](/tags.md)

[Add tags as a line on a given page](https://github.com/billryan/gitbook-plugin-tags#add-tags-in-page)

[Do not add any links to the tags page in SUMMARY.md](https://github.com/billryan/gitbook-plugin-tags/issues/5)

## Local Dev

```shell
npm install -g gitbook-cli
git clone git@github.com:Solid-Interactive/solid-book.git
cd solid-book
gitbook install
(sleep 3; open http://localhost:4000) &; gitbook serve
```

`npm run dev` will do the last line from the above

To deploy push a commit to the `master` branch.

## Links

For links PhpStorm has good auto-completion.

