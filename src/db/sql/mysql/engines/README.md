# MySQL Engines

tags: mysql, innodb, myisam, engines

MySQL has 2 storage engines: MyISAM and InnoDB. InnoDB is newer and generally better (MyISAM can have advantages in specific use cases):

https://kinsta.com/knowledgebase/convert-myisam-to-innodb/

https://dba.stackexchange.com/questions/1/what-are-the-main-differences-between-innodb-and-myisam

InnoDB has:
* Transaction (so it is [ACID](https://en.wikipedia.org/wiki/ACID))
* Row level locking (vs table locking)
* Foreign key constraints
* Automatic crash recovery
* Table compression


One thing to watch out for is that InnoDB only has FULLTEXT search indexes starting at v5.6.4

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
