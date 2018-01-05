# Debugging MySQL

tags: mysql, errors, debugging

## MySQL 5.7.8 - variables doesn't exist

```
Couldn't execute 'SHOW VARIABLES LIKE 'gtid\_mode'': Table 'performance_schema.session_variables' doesn't exist (1146)
```

The error above is explained [here](https://stackoverflow.com/questions/31967527/table-performance-schema-session-variables-doesnt-exist).

Solving the issue takes 3 steps.

You should take backups before upgrading:

```
mysql -uroot -p
set @@global.show_compatibility_56=ON;
```

Now you can run you backups. Turn the flag back off:

``` 
set @@global.show_compatibility_56=OFF;
```

And upgrade and restart:

``` 
sudo mysql_upgrade -u root -p --force
sudo service mysql restart
```
