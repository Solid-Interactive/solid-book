# Eloquent

tags: mysql, db, orm

Aliasing the models table name, a column name, and only pulling in certain columns:

```php
ClassActivityModel::from('class_activity as ca')
    ->join('wp_posts', 'activity_post_id', '=', 'wp_posts.ID')
    ->where('class_id', $class_id)
    ->select('ca.*', 'wp_posts.post_title as description')
    ->get();
```

A join without using the from would be:

```php
Model::join(...
```

## Docs

* https://laravel.com/docs/5.6/queries