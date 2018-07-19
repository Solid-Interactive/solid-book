# Mysql

tags: mysql, sql, trim

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
mysql -h host.name -u db_user_name -p db_name < db_name_backup.sql
```

## Trim

```mysql
# search for trailing \n
select * from wp_postmeta where meta_key='company_name' AND meta_value LIKE '%\n';

# test command
select TRIM(TRAILING '\n' FROM meta_value) from wp_postmeta where meta_key='company_name' AND meta_value LIKE '%\n';

# run command
update wp_postmeta SET meta_value = TRIM(TRAILING '\n' FROM meta_value) where meta_key='company_name' AND meta_value LIKE '%\n';
```
