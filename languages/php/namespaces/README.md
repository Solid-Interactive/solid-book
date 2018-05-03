# Namespaces

tags: php, namespaces

[Namespaces](http://php.net/manual/en/language.namespaces.php) allow you to not have to worry about naming collisions. You will often have to reach into other namespaces.
Here is an example:

```php
use WeDevs\ORM\Eloquent\Model;

class ClassTrainee extends Model {
```

is easier to read than:

```php
class ClassTrainee extends \WeDevs\ORM\Eloquent\Model {
```

## References:

* http://php.net/manual/en/language.namespaces.php