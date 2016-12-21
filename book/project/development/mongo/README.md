# Mongo

## Debugging

If the service doesn't start you can often get useful output trying to manually start or fix mongo

```
sudo -H -u mongodb mongod --config /etc/mongod.conf
```

`echo $?` for the exit code if the above doesn't keep going.

```
sudo -H -u mongodb mongod --repair
```

Things that often seem to be missing are the log file and `/data/db` dir.
Mongo will not start with a lock file at `/var/lib/mongodb/mongodb.lock`.