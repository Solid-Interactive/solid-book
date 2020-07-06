# Laravel

tags: laravel, php, mysql, mvc

## Overview

* At a high level, Laravel is an MVC framework:
  * Models are linked to database tables, and you can read/write to the database via the models.
  * Views are blade template files.
  * Controllers handle requests and return a response, e.g. view, redirect, etc.
* It also handles routing, migrations, events, and much more.
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

* Front end assets are compiled in `webpack.mix.js` via a wrapper called `laravel-mix`. You pretty much just give it the source file and tell it where to put the result:
  ```js
  mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/auth.scss', 'public/css');
  ```
* This setup greatly simplifies webpack. The tradeoff is it reduces customization as well. But it pretty much does what you want with almost no effort.
* for dev run: `npm run dev`
* for minified run: `npm run prod`

## Models

* Create models with artisan (This will add the model file, and the migration file.)
  ```sh
  php artisan make:model Topic --migration
  ```
* Add the table columns in the migration file. See all column types here: https://laravel.com/docs/7.x/migrations#columns
* Save model to db:
  ```php
  $myModel = new MyModel();

  $myModel->myColumn = 'Hello';

  $myModel->save();
  ```
* Load models from db:
  ```php
  // All records.
  $myModels = MyModel::all();

  // Query records.
  $myModels = MyModel::where('active', 1)->get();
  ```
* To update models, just set the fields and save.

## Routing

* Add routes to `routes/web.php`.
* Hello world:
  ```php
  Route::get('home', function() {
    return 'Hello, world';
  });
  ```
* Typically you pass a controller and method name though:
  ```php
  Route::get('home', 'HomeController@index');
  ```
* Resource controllers automatically support crud methods, typically for models:
  ```php
  Route::resource('posts', 'PostController');
  ```

## Controllers

* Generate controllers with artisan:
  ```sh
  php artisan make:controller HomeController
  ```
* Resource controllers have the crud methods prepopulated (also, pass the model when generating to include type hints):
  ```sh
  php artisan make:controller PostController --resource --model=Post
  ```
* See the resource actions available here: https://laravel.com/docs/7.x/controllers#resource-controllers
* Each controller method receives the request as the first argument. This has the request params (query string and form data) and many helpful methods:
  ```php
  public function index($request)
  {
    $myParam = $request->myParam;

    $user = $request->user();

    // return response here...
  }
  ```

## Views

* Views are blade template files that allow dynamic data to be rendered in html:
```php
<h1>{{ $user->name }}</h1>
```
* Views are typically rendered as a responses from controller methods using the `view` helper:
  ```php
  public function index($request)
  {
    return view('my-view', [
        'user' => $request->user()
    ]);
  }
  ```
* Pass the path to the blade template inside `resources/views`, and omit `.blade.php`.
* Pass data to the view as an array. The keys will be available as variables in the blade template.

## Forms

* Validate forms with the validate method on the request:
  ```php
  public function store($request)
  {
    $request->validate([
        'myParam' => ['required'],
    ])

    // Validation passed! Save form data to db, etc.

    return back() // back helper redirects back to referrer, i.e. the form that posted.
      ->with('status', 'success') // set session data so we can display a success message.
  }
  ```
* If validation fails, it will automatically redirect back to the form with `$errors` in the session.
* Also notice above how we redirect back with success in the session if the form submitted successfully.
