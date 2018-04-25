# Setting up xdebug with Vagrant

tags: php, debugging

## Installing xdebug

Assuming you don't have xdebug in your environment, first output phpinfo

```php
<?php
phpinfo();
```

Now take that output, paste it into https://xdebug.org/wizard.php, and follow the instructions.

These php.ini settings (in addition to pointing to the so) worked for me:

```
[XDebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_connect_back = 1
```

Look for you IDE key in `phpinfo()` if you need it.

---

You can setup  PhpStorm as follows:

From the file menu: `Run > Edit Configurations...`.

Add one to `PHP Remote Debug`: ide key = `xdebug` - the value from php.ini.

Under settings (`Cmd-,`) type, "server" and make sure that the Debug port is
`9000` - the value from php.ini. Also, the `Can accept external connections` must
be checked (`Languages & Frameworks > PHP > Debug`)

Finally under `Languages & Frameworks > PHP > Servers`, set the Host to `192.168.12.138`, port `9000`,
debugger `xdebug`.

You also have to check `use path mappings`. Here you have to have your local project directory
on the left and the corresponding vagrant directory on the right. e.g `~/git/project` and `/vagrant`.

At this point clicking `run debugger` should work after clicking on a breakpoint
in PhpStorm.

The default fastcgi timeout is 1 minute, so to avoid getting 504 errors (which
  are generally not harmful to debugging), you can add the
following to your nginx config

```
fastcgi_read_timeout 1d;
```

This is a timeout of one day - hopefully long enoug for your debugging session ;)

## Older PHP

The wizard above only work on php 7 and above. For older versions:

```
sudo apt-get install php-xdebug`
```

add the following to your loaded php.ini as retrieved from `phpinfo()`:

```
[XDebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_connect_back = 1
```

Now restart php: `sudo service php5.6-fpm restart`

If you need to restart send a signal: `sudo nginx -s reload`. Sending a signal will do nothing if there's a syntax error in your cofigs. Restarting the service will first stop the service and then fail to restart if there's an error.



## References

http://walkah.net/blog/debugging-php-with-vagrant/
