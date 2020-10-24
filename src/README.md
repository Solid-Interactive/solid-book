# The Big Incomplete Book of Dev

The latest "published" version can be accessed at [http://soliddigital.github.io/solid-book/](http://soliddigital.github.io/solid-book/).

## Contributing

To edit the book go to [https://github.com/soliddigital/solid-book](https://github.com/soliddigital/solid-book) and edit the markdown pages. CI will publish
the new version.

## Organization

Topics are roughly organized into a hierarchy by subjects. Of course
this organization doesn't always work completely. Sometimes a page could
fit into more than one topic.

## Local Dev

```shell
# install rust and mdbook
curl https://sh.rustup.rs -sSf | sh
cargo install mdbook

git clone git@github.com:soliddigital/solid-book.git
cd solid-book
mdbook serve
```

To deploy push a commit to the `main` branch.

For links PhpStorm has good auto-completion.

---
Maintained by [Solid Digital](https://www.soliddigital.com/)
