# Wordpress Engine

tags: wordpress, wp-engine

Ideally hook WP Engine up with Git deploy.

If you're doing a one time deploy with no Git hookup, here is a quick way to do it:

1. Make a backup point in WP Engine
1. Do a search and replace with wp cli on the dev environment from the dev to production domain
1. Download the sql file from your dev environment
1. rsync the sql file onto wp-engine's wp-content directory (it will not be publicly accessible)
1. rsync the uploads dir onto wp engine (e.g. `rsync -rztP ./uploads/ example@example.ssh.wpengine.net:/home/wpe-user/sites/example/wp-content/uploads/` - `r` recursive, `z` comress, `t` preserve time stamps, `P` progress bar)
1. rsync the plugins dir onto wp engine
1. rsync the themes dir onto wp engine
1. ssh in to wp-enginen and load the sql file into the db using the credentials in wp-config.php

Note that you might have to change the table prefix after uploading the SQL.

Also not that the sql file size limit is small on Wp Engine's PHPMyAdmin, so it's generally easier to upload the sql via ssh.
