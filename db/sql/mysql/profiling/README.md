# Profiling MySQL

To list queries that take one or more seconds use `my.cnf`, often located at:
`/etc/mysql/my.cnf`.

```
log_slow_queries        = /var/log/mysql/mysql-slow.log
long_query_time = 1
```

Don't forget to `sudo service mysql restart` after making the changes.
