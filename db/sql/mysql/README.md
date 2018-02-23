# Mysql

tags: mysql, sql

## Login
```sh
# -p will prompt for password
mysql -h host.name -u db_user_name -p
```

## `mysqldump` (Export)
```sh
mysqldump -h host.name -u db_user_name -p db_name > db_name_backup.sql
```

## Import
```sh
mysqldump -h host.name -u db_user_name -p db_name < db_name_backup.sql
```
