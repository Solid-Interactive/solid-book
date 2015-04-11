# FastCgi

## Environmental variables

It's often convenient to define environemental variables as they are passed in.
The allows per vhost setting for things like php's `$_SERVER['foo']`.

```
# not sure if this is quite right
fastcgi_param foo "bar"
```

## Prepend and append

You can prepend and postpend files using nginx when passing to fastcgi with
`fastcgi_param`. The same value can also be add to `php.ini`.

```
fastcgi_param PHP_VALUE "auto_prepend_file=/path/to/xhgui/external/header.php";
```

You can do the same with `auto_append_file` too.

The functional difference between the two is that if you use nginx, you can
easily control which virtual hosts receive the files, while in `php.ini` all
vhosts will receive it.
