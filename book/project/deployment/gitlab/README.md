# Deploying with Gitlab

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

Here is how to setup deploys via pipelines to a staging server:

1. Add a deploy key to the server
1. git clone the repo on the server using `--single-branch`
1. add a `.gitlab-ci.yml` to define your stages and environments. below is an example that will jshint and deploy is jshint passes:

    ```
    stages:
      - test
      - deploy
    test_staging:
      stage: test
      script:
        - npm install -g jshint
        - npm test
    deploy_staging:
      stage: deploy
      script:
        - git push user@server.com:/home/user/project HEAD:develop
      environment:
        name: staging
        url: https://server.com/#/
      only:
      - develop
    ```  

You have to use a [gitlab-runner](https://docs.gitlab.com/runner/install/) to have gitlab run the above.
