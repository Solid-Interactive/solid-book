# Profiling MySQL

tags: db, sql, mysql, performance, profile

To list queries that take one or more seconds use `my.cnf`, often located at:
`/etc/mysql/my.cnf`.

```
log_slow_queries        = /var/log/mysql/mysql-slow.log
long_query_time = 1
```

For mysql 5.6+ use these setting keys in the config file:

```
slow_query_log = 1
slow_query_log_file = /var/log/mysql/mysql-slow.log
long_query_time = 10 # time in seconds
#log_queries_not_using_indexes = 1
```

* Create the slow log file, and set mysql as the owner (or just match the ownership of the mysql error log file).
  ```
  sudo touch /var/log/mysql/mysql-slow.log
  sudo chown mysql /var/log/mysql/mysql-slow.log
  ```
* restart mysql: `sudo service mysql restart`
