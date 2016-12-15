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
