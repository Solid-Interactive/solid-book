# Creating users in Mongo

tags: mongo, users, nosql, auth

1. Authorize with the admin user, usually on the admin db.
1. Switch to the db of interest.
1. Create the user with appropriate roles.

A simple example:

```shell
$ mongo
> use admin;
> db.auth('admin', 'my-super-secret-password');
> use someDb;
> db.createUser({
    user : "someDbUser",
    pwd : "a-super-duper-password",
    roles : ["dbOwner"]
  });
```

References:

* http://docs.mongodb.org/manual/reference/method/db.createUser/
* http://docs.mongodb.org/manual/reference/built-in-roles/#built-in-roles
