# Mongo

tags: mongo, nosql

## `mongodump`
```sh
mongodump --db <db-name> --username <db-user-name>
```

## `mongorestore` - restore from `mongodump` backup
```sh
mongorestore --db <db-name> --drop --dir <dump-dir>
```
