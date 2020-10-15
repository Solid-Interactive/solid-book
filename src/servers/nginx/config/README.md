# Nginx configs

tags: nginx, configs, error, php

## Restarting

After making changes to the nginx config files don't forget to restart:

```
sudo nginx -s reload
```

Avoid using `sudo service nginx restart`, since that will crash the server if
there are syntax errors in the changes. `sudo nginx -s reload` will not do a
restart if it finds erros.

## Request Entity Too Large - 413

This can be fixed in the global `http` block or an individual `server` block.

```nginx
client_max_body_size 20M;
```

If you are working with PHP, then don't forget to modify these two lines in you php.ini:

```php
; e.g. in /etc/php/7.0/fpm/php.ini
upload_max_filesize = 20M
post_max_size = 20M
```
