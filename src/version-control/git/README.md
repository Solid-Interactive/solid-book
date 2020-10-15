# Git

tags: git

## Pro tips
Change case of file or directory:
```
git mv -f readme.txt README.txt
```

Get diff exclude path:
```
git diff sha_old..sha_new -- . ':!path/to/exclude'
```

Checkout new local branch to track origin branch of same name:
```
git checkout -t origin/branch-name
```
