# Php-fpm configs

tags: children, php, processes

## Config file location

On our Ubuntu servers at the time of writing this were using php-fpm7.2
Config file can be found:
```
/etc/php/7.2/fpm/pool.d/www.conf
```

### Calculating average process size
Run the command below to get a general idea of how much memory each PHP FPM process is consuming.
```
ps --no-headers -o "rss,cmd" -C php-fpm7.2 | awk '{ sum+=$1 } END { printf ("%d%s\n", sum/NR/1024,"M") }'
```

### Determining Number of cores
```
echo Cores = $(( $(lscpu | awk '/^Socket/{ print $2 }') * $(lscpu | awk '/^Core/{ print $4 }') ))
```

### pm.max_children
Take the memory that you want to allocate to PHP FPM and divide it by the average memory that is consumed by each PHP FPM process.

In my case, I want to allocate 4GB (4000MB) and each process consumes about 29MB.

Divide 4000 by 29 and you get around 138.

Set pm.max_children to 138.


### pm.start_servers
For pm.start_servers, I multiply the number of cores that I have by 4.

4 x 4 = 16

So I set pm.start_servers to 16.

If you have 8 cores, then it will be: 4 x 8 = 32.

### pm.min_spare_servers
For pm.min_spare_servers, multiply the number of cores that you have by 2.

In my case, that is 2 x 4 = 8.

So I set pm.min_spare_servers to 8.

### pm.max_spare_servers
For pm.max_spare_servers, multiply the number of cores on your server by 4.

On my machine, that is 4 x 4 = 16.

So I set pm.max_spare_servers to 16, the same value that I used for pm.start_servers.


## Restarting php-fpm
After you update your config file you need to restart the php-fpm process
```
sudo service php7.2-fpm restart
```