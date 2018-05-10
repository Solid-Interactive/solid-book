# Eloquent

tags: mysql, db, orm

## Aliasing

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

## Group and Count

```php
$user_info = DB::table('usermetas')
                 ->selectRaw('browser, count(*) as total')
                 ->groupBy('browser')
                 ->get();
```

## whereColumn

If your value is another column, then you must use `->whereColument`:

```php
$sessionActivity = new SessionActivityModel();
$result = $sessionActivity
    ->select('cta.user_id', 'u.display_name')
    ->from('session_activity as sa')

    ->join('class_activity as ca', 'ca.id', '=', 'sa.class_activity_id')
    ->join('class_trainee_activity as cta', 'ca.activity_post_id', '=', 'cta.activity_post_id')
    ->join('wp_users as u', 'cta.user_id', '=', 'u.ID')

    ->where('sa.session_id', '=', $session_id)
    ->where('sa.class_activity_id', '=', $class_activity_id)
    ->whereColumn('cta.class_id', '=', 'ca.class_id')

    ->get();
```

## Debugging

Replace `->get()` with `->toSql()`.

## Docs

* https://laravel.com/docs/5.6/queries