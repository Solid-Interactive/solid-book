# MySQL Engines

tags: mysql, innodb, myisam, engines

MySQL has 2 db engines: MyISAM and InnoDB. InnoDB is newer and generally better:

https://kinsta.com/knowledgebase/convert-myisam-to-innodb/

Additionally only InnoDB supports foreign key constraints.

To see which DBs have MyISAM tables:

```mysql
SELECT TABLE_SCHEMA
FROM information_schema.TABLES
WHERE ENGINE = 'myISAM'
GROUP BY TABLE_SCHEMA
```

To list each table and the DB it's in:

```mysql
SELECT TABLE_SCHEMA, TABLE_NAME, ENGINE
FROM information_schema.TABLES
WHERE ENGINE = 'myISAM'
```

To convert (back things up first - MySQL 5.6.4+ suggested):

```mysql
use my_db;
ALTER TABLE my_table ENGINE=InnoDB;
```
