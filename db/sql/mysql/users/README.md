# Creating Users

```
# show all users
select User from mysql.user;
show grants for 'root'@'localhost';

# create user with password and give privileges
create user '[username]'@'localhost' identified by '[the password]';
grant all privileges on [db name].* to `[user name]`@'localhost';
flush privileges;
```

## References

* http://dev.mysql.com/doc/refman/5.1/en/adding-users.html
* https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
* http://stackoverflow.com/questions/5016505/mysql-grant-all-privileges-on-database
