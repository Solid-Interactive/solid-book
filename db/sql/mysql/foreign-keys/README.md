# Foreign Keys

tags: mysql, foreign keys, references

[Foreign keys](https://dev.mysql.com/doc/refman/5.6/en/create-table-foreign-keys.html) allow you to make references from
one entry in a row in a table to another.

You add the foreign key constraints to the child table.

When a parent row containing a reference is deleted or updated you can have the child rows deleted or updated too using `CASCADE`.

Foreign key errors can be terse and cryptic. To get a more verbose version run the following command:

```mysql
SHOW ENGINE INNODB STATUS
```

Then look in the `status` field for `LATEST FOREIGN KEY ERROR`.

## References:

* https://dev.mysql.com/doc/refman/5.6/en/create-table-foreign-keys.html
* https://www.sitepoint.com/mysql-foreign-keys-quicker-database-development/