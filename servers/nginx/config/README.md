# Nginx configs

After making changes to the nginx config files don't forget to restart:

```
sudo nginx -s reload
```

Avoid using `sudo service nginx restart`, since that will crash the server if
there are syntax errors in the changes. `sudo nginx -s reload` will not do a
restart if it finds erros.
