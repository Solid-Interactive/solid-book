# Managing keys on Ubuntu

tags: ubuntu, keys

List keys:

```bash
sudo apt-key list
```

[Renew keys](https://stackoverflow.com/a/46737148/186636):

```bash
sudo apt-key list | \
 grep "expired: " | \
 sed -ne 's|pub .*/\([^ ]*\) .*|\1|gp' | \
 xargs -n1 sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys
```