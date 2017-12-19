# Deploying with Gitlab

tags: devops, deployment, gitlab, ci

Gitlab now has the concept of [pipelines](https://docs.gitlab.com/ee/ci/pipelines.html).
You can use pipelines to setup a series of stages. Stages are things like
test and deploy.

Deploys can be made to multiple [environments](https://docs.gitlab.com/ce/ci/environments.html). Environments
are things like `staging` and `production`.

You can define your stages and environments in a [`.gitlab-ci.yml`](https://docs.gitlab.com/ce/ci/yaml/) file at the
root of your repo.

To get Gitlab CI working, you have to setup a [runner](https://docs.gitlab.com/ee/ci/runners/README.html).
A runner is simply something that runs the stages. A very simple way to
do this is to [set up a shared runner](https://docs.gitlab.com/ee/ci/runners/README.html#registering-a-shared-runner) on an EC2 box.

The runner will run under the user `gitlab-runner`.

## Setting up gitlab deploys with pipelines

Here is how to setup deploys via pipelines to a staging server if you already have a gitlab runner setup.

1. Add a deploy key to the server your project code will live on. This allows the repo to be read from that server.
1. add a `.gitlab-ci.yml` at the root of your project to define your stages and environments. below is an example that will run `npm test` with dependencies in the deploy dir, and then use pm2 deploy.

    ```
    stages:
      - test
      - deploy
    test_staging:
      stage: test
      script:
        - npm install deploy
        - npm test
    deploy_staging:
      stage: deploy
      script:
        - pm2 deploy deploy/sample.staging.config.js staging
      environment:
        name: staging
        url: https://sample.staging.com/
      only:
      - develop
    ```  
    
The cwd of the script is the root of the project, so in the case above the config file for the deploy are in a deploy dir a the root of the project.
    
[PM2 deploy](http://pm2.keymetrics.io/docs/usage/deployment/) is convenient for node deploys, but it can also be used for any other type of deploy. There are hooks to support
doing work both on either the runner or the deployed to server. It allows all these hooks to be stored in the repo as 
opposed to in a git hook outside the repo.

Below is how a PM2 config file could be setup for a PHP deploy. Sample for node deploys can be found in the PM2 docs.

```
'use strict';
module.exports = {
    apps : [ ],
    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy : {
        staging : {
            user : "ubuntu",
            host : "sample.staging.com",
            ref : "origin/develop",
            repo : "git@git.sample.com:group/project.git",
            path : "/var/www/vhosts/project",
            "pre-deploy-local": "pm2 deploy deploy/sample.staging.config.js staging setup || echo 'already setup'",
            "post-deploy" : "echo 'done. do not run default.'"
        }
    }
};
```

### Trouble Shooting

You will get a 403 when trying to run a build if you are not a member of the project. This can happen to admins who can access the build panel for projects they do not belong to.
