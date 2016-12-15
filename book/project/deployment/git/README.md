# Deploying to a Server

There are several types of deployments. A deployment workflow should always be
easy to remember, reliable, and repeatable. This section will cover how to deploy
from a work box to a staging or production server using `git push`.

Git 2.3+ supports push to deploy. In other words you can send code from your
computer to a server via ssh using git. Since git comes with hooks, including a
`post receive`, it is relatively straight forward to use git for deployment Heroku style.

Make sure you have git 2.3+. On a mac:

```
brew update
brew upgrade git
```

You might have to rm a symlink to another version (`rm $(which git)`).

On ubuntu:

```
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get install git
```

On the server, clone the repository. You should only clone the single branch the
deployments are on. This can be done with `--single-branch`:

For example, if all the deploys are on the branch `deploy/production`:

```
cd /var/www/vhosts
git clone -b deploy/production --single-branch git@git.mydomain.com:foo/bar-project.git foo.bar.com
```

To enable pushing into the repo, you must enable it:

```
cd foo.bar.com
git config receive.denyCurrentBranch updateInstead
```

Make sure ssh is enabled on your server.

This is the minimum setup. Additionally depending on the type of project, you
might want to setup post-receive hooks. These can be used to `npm install && pm2 restart`,
notify New Relic of a deployment, etc.

The two tricky part about hooks are:

1. Hooks are run by the user that was used for the ssh access. This could be important - for example - when updating node projects, where the user is important.

1. Commands must be fully qualified, so `git` won't work, but `/usr/local/bin/git` would.

This completes the server setup. To setup your workbox, add the remote needed:

```
git remote add deployProduction ssh://username@domain.com:1234/var/www/foo.bar.com
```

The format is the ssh login followed by the directory the git repo is in.

To deploy push the branch to the deployment remote:

```
git push deployProduction deploy/production
```

This setup is flexible enough to allow deployments to multiple environments and repos.
Remember the full deployment command is a bother, so we often setup the command
`grunt deploy` which uses `grunt-prompt` to query the environment and any other information
needed:

```
prompt : {
    deploy : {
        options : {
            questions : [
                {
                    config : 'environment',
                    type : 'list',
                    message : 'Envirnoment to deploy to:',
                    default : 'staging',
                    choices : ['staging', 'production']
                },
                {
                    config : 'clients',
                    type : 'checkbox',
                    message: 'Clients to deploy (space to pick, enter to finalize):',
                    choices: [
                        'one',
                        'two',
                        'two-and-a-half',
                        'three'
                    ]
                }
            ]
        }
    }
}
```

This can be combined with `grunt-shell` to do the full deploy.
