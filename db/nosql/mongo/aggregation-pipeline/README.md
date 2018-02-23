# Aggregation Pipeline

tags: mongo, aggregation

The [aggregation pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/) can
be used for doing more complicated operations.

For example, here is how you find duplicates by title, show how many duplicates, and sort
them from most to least duplicated:

```
db.content.aggregate(
    {"$group" : { "_id": "$fields.title", "count": { "$sum": 1 } } },
    {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }, 
    {"$sort": {"count" : -1} },
    {"$project": {"name" : "$_id", "count" : "$count", "_id": 0 } }
)
```
