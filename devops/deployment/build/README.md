# Build Process for Webpages

This describes some general concepts for creating a build for an HTML page.
The HTML itself can be served as a file or via other methods (e.g. express & a
    jade template).

The build script itself has to accomplish some general things:

* build script (should be in bin of project)
    * it's generally useful to have things just work for locally deving, but
        this means that for creating deploys you will have to run a specific
        build task
    * differences between local dev and a deploy that need to be taken into
        account for the build script.
        * replace watchify with browserify
        * make sure bin/deploy acutally builds all js/css/etc from the current.
            * This allows optimization of the assets
            * This will avoid issues where you just deploy the previously built local dev assets.
        * make sure built assets are gitignored (bundle.js, main.css, etc)

And some specific things:

* cache busting
    * convenient to us a hash of the file contents for this
    * `<script src="/optimized/js/dashboard.4978239874bae7.min.js"></script>`
    * if using express and a jade template can use 
* serving static assets
    * gzip and minify, ETAGs, ttl
        * gzip, minify, cache headers can be set in both nginx and node
        * gzip, minify nginx is good at
        * usually do etags on node
* https://github.com/h5bp good source for boilerplate
* awesome check http://tools.pingdom.com/fpt/
* baseurl - if you want to be able to build to various folders
*
