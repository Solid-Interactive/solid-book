# Apache Redirects

tags: redirects, apache, rewriterule, rewritecond

There are multiple way to handle redirects with Apache.

## Redirect

The simplest way to do a redirect in Apache is using the [Redirect](https://httpd.apache.org/docs/2.4/mod/mod_alias.html#redirect) directive.

Any request **beginning** with the url path will be affected:

```apacheconfig
Redirect "/account/" "/services/account/"
```

(use quote marks if you have spaces in your urls - if you always use quote marks, you don't have to think about whether you need them or now)

The above will redirect `/account/` and `/account/login/`.

The following will cause a redirect loop:

```apacheconfig
# Redirect loop
Redirect "/account/" "/account/services/"
```

You cannot match get parameters with `Redirect`. 

## RewriteRule

[RewriteRule](https://httpd.apache.org/docs/2.4/rewrite/intro.html) uses a regular expression to match the path.

`RewriteRule` cannot match get parameters.

You do not have to escape `/` in RewriteRule.

`$n` is used to refer to capture groups

```apacheconfig
RewriteRule ^/car/([^/]+)/ /my/$1/automobile/
```

## RewriteCond

Describes conditions under which a RewriteRule should be applied. You can test [many things](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritecond) with RewriteCond.

A useful item to test with RewriteCond, which cannot be tested with Redirect or RewriteRule is a GET parameter:

```apacheconfig
RewriteCond %{REQUEST_URI} ^/search/$
RewriteCond %{QUERY_STRING} query=weather
RewriteRule ^.*$ /weather/?type=local [R=301,L]
```

It is a [good idea](https://techjourney.net/add-trailing-slash-to-the-end-of-the-url-with-htaccess-rewrite-rules/) to normalize your trailing forward slashes with RewriteCond, since it makes the rest of you rules easier:

```apacheconfig
    RewriteEngine on

    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !(.*)/$
    RewriteCond %{REQUEST_FILENAME} !\.(gif|jpg|png|jpeg|css|js|txt)$ [NC]
    RewriteRule ^ %{REQUEST_SCHEME}://%{HTTP_HOST}%{REQUEST_URI}/ [L,R=301,NE]
```

or 

```apacheconfig
RewriteCond %{REQUEST_URI} !\.[^./]+$
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ /$1/ [R=301,L] 
```