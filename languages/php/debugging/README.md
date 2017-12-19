# Setting up xdebug with Vagrant

tags: php, debugging

This assumes a setup of `php5-fpm`, `vagrant`, `nginx`, and `phpstorm`.

## Installing xdebug

Assuming you don't have xdebug in your environment, first install it:

```
sudo pecl install xdebug
```

Read the output and note the location of the `.so` file, then modify `php.ini`:

```
zend_extension="/usr/lib/php5/20121212/xdebug.so"
xdebug.remote_enable=1
xdebug.remote_connect_back=on
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.remote_autostart=1
xdebug.idekey="xdebug"
```

Then assuming you have the following ip in your Vagrantfile:

```
config.vm.network "private_network", ip: "192.168.12.138"
```

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
