# Apache
## Example
```xml
<VirtualHost *:80>
    DocumentRoot /var/www/vhosts/domain.com/current
    ServerName www.domain.com
    ServerAlias domain.com
    <Directory /var/www/vhosts/domain.com/current/>
        Options MultiViews FollowSymLinks Indexes
        AllowOverride ALL
    </Directory>
</VirtualHost>

<VirtualHost *:443>
    ServerName www.domain.com
    ServerAlias domain.com
    DocumentRoot /var/www/vhosts/domain.com/current
    SSLEngine on
    SSLCompression off
    SSLProtocol All -SSLv2 -SSLv3
    SSLHonorCipherOrder On
    SSLCipherSuite ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:RSA+AESGCM:RSA+AES:!aNULL:!MD5:!DSS
    SSLCertificateFile /etc/ssl/certs/domain.com/ServerCertificate.cer
    SSLCertificateKeyFile /etc/ssl/certs/domain.com/domain.com.key
    SSLCACertificateFile /etc/ssl/certs/domain.com/CACertificate-1.cer

    Alias /robots.txt /var/www/vhosts/robots.txt

    <Location "/var/www/vhosts/robots.txt">
            Order deny,allow
            Allow from all
    </Location>

    <Directory /var/www/vhosts/domain.com/current/>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride All
    </Directory>
</VirtualHost>
```

## Restart
Always test if the config is valid before attempting a restart:
```sh
apache2ctl configtest
```
If so:
```sh
service apache2 restart
```
