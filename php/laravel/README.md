# Laravel

tags: laravel, php, mysql,

## Overview

* The docs are good. Use the search feature. https://laravel.com/docs/7.x

## CLI

* Laravel includes a cli tool `artisan` which is used extensively to generate files, run migrations, etc.

## Logging

* Laravel supports many custom options for logging, but by default logs to `storage/logs/laravel.log`.
* Log yourself with static methods on the log facade `Illuminate\Support\Facades\Log`, e.g. `debug`, `error`, etc. https://laravel.com/docs/7.x/logging#writing-log-messages

## Override vendor views

* Override vendor views by placing a file with the same path and name in the application's views folder, e.g.
    * vendor file: `vendor/<vendor>/<vendor module>/resources/views/products/edit.blade.php`
    * override file: `resources/views/vendor/<vendor module>/products/edit.blade.php`

## Events

1. Add the event to `app/Providers/EventServiceProvider.php`'s `listen` array, e.g.
    ```php
    use Illuminate\Auth\Events\Login;
    use App\Listeners\UpdateLastLogin;

    //

    protected $listen = [
        Login::class => [
            UpdateLastLogin::class,
        ],
    ];
   ```
1. Then run `php artisan event:generate`. This will create the listener class at `app/Listeners/UpdateLastLogin.php` (and any other listeners not yet defined).
1. Then add your code to the `handle` method in the new class.

## Migration

1. Generate migration script with `php artisan make:migration <migration_name>`. This will generate a migration file at `database/migrations/<timestamp>_<migration_name>.php`.
1. Fill in the `up` and `down` methods in the new class, e.g.
    ```
    // up
    Schema::table('users', function (Blueprint $table) {
        $table->timestamp('last_login_at')->nullable();
    });

    // down
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('last_login_at');
    });
    ```
1. Run migrations with `php artisan migrate`. This will run the `up` methods of all outstanding migrations (it keeps track of which ones it has run in the database).

* Rollback migrations with `php artisan migrate:rollback`. This will run the `down` methods.

## js/css

TODO
