# Setting up xdebug with Vagrant

tags: php, debugging

## Installing xdebug

Assuming you don't have xdebug in your environment, first output phpinfo

```php
<?php
phpinfo();
```

Now take that output, paste it into https://xdebug.org/wizard.php, and follow the instructions.

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

## References

http://walkah.net/blog/debugging-php-with-vagrant/
