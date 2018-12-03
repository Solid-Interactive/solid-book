# Nginx

tags: nginx

Nginx is a light weight web server that is designed for speed and high concurrency.

Nginx is a good reverse proxy. For example it can pass http requests to node or php-fpm.

Nginx serves static content very quickly.

Nginx is also load balancer.

Many people find configuring Nginx easier than configuring Apache. Clearly this is a matter of opinion.

Nginx has a free and paid version. The free version lags behind in feature to the paid version, but the free
version is definitely production ready.

* [Nginx beginner guide](http://nginx.org/en/docs/beginners_guide.html)
* [Nginx vs Apache opnion](https://www.digitalocean.com/community/tutorials/apache-vs-nginx-practical-considerations)
* [Nginx context](https://www.digitalocean.com/community/tutorials/understanding-the-nginx-configuration-file-structure-and-configuration-contexts)
* [Typical Nginx directory structure](https://wiki.debian.org/Nginx/DirectoryStructure)
  * Configs are loaded starting at `/etc/nginx/nginx.conf`. Usually `/etc/nginx/sites-enabeld/*` is loaded form there
  * Store virtual hosts in `/etc/nginx/sites-available` and add symlinks to sites-enabled. These symlinks should point to sites availabed.
  * Using sites-availabe / sites-enabled allows you to pick the currently enabled sites from a store house of potential available sites

Use `nginx -s reload` to restart nginx. Do not use service to do so. Sending a signal will first
test you configs and do nothing if they have a syntax error. Using the service will first stop the
nginx service, so if there's a syntax error, you just took down the server.


