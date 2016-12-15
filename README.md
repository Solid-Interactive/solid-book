# The Big Incomplete Book of Dev

The latest "published" version can be accessed at http://solid-interactive.github.io/solid-book/ .

The most recent version can be accessed by cloning and building locally:

```shell
npm install -g gitbook-cli
git clone git@github.com:Solid-Interactive/solid-book.git
cd solid-book
gitbook install
(sleep 3; open http://localhost:4000) &; gitbook serve
```

`npm run dev` will do the last line from the above

To deploy, `grunt deploy`
