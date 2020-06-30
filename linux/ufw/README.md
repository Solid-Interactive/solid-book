# UFW

tags: ufw, firewall

Make sure you don't get locked out!

```bash
# list added rules even if disabled 
sudo ufw add ssh
sudo ufw add 443
sudo ufw add 80
sudo ufw show added
```

Enable it

```
sudo ufw enable
```

or disable it

```
sudo ufw disable
```
