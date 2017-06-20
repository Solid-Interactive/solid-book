# Security

This is a very incomplete and partial look at security.

## Binding to localhost

Binding to localhost increases security and removes the ability for easy access
to many services that use ports to run (mysql, mongo, elasticsearch).

This means that the
ports the services use will not be available directly from other hosts. This allows
better control of access. For example if you bind mongo to localhost, applications
running on your server can still access it. You can also get access via SSH
tunnels or proxies. For example using nginx and htpasswd you can password protect
something like elasticsearch. Nginx can listen on port 80, and only allow access
in certain cases by doing a proxy_pass to localhost port 9200.

## Login

SSH login is much more secure - and ends up being easer to manage for users - than
password login, so it is a good idea to turn off password login and enable ssh
login.

SSH login can be enabled and password login disabled in `/etc/ssh/ssh_confd`:

```
PubkeyAuthentication yes
PasswordAuthentication no
```

After this is done the sshd service must be restarted for the changes to take effect:

```
sudo service ssh restart
```

Make sure you don't lock yourself out. It is a good idea to first enable ssh login,
test it, then disable password login.

## SSH port

`tail -f /var/log/auth.log` will often show a lot of attempted logins on port 22
of people you don't know. Changing the ssh port to something other than 22 will
decrease this barage.

The ssh port can be change in `/etc/ssh/sshd_config`:

```
Port 22
```

## Disabling sslv3

In the http context:

http://nginx.org/en/docs/http/configuring_https_servers.html

```
##
# SSL Settings
##
ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
ssl_ciphers  HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
```

Check your results:

https://www.ssllabs.com/ssltest/
