# NGINX Redirects

tags: nginx, redirects

You can use the nginx map function to do these redirects:

```
# load the variables
map $uri $new {
    include /etc/nginx/redirect.map;
}

server {
    ...
   if ($new) {
        rewrite ^ $new redirect;
    }
}
```

The redirects file would look like:

```
/old-url1 https://example.com/new-url1
/old-url2 https://example.com/new-url2
```

If you have many redirects you will have to bump [map_hash_bucket_size](http://nginx.org/en/docs/http/ngx_http_map_module.html#map_hash_bucket_size).
