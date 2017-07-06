# Gitflow

Gitflow is a way of organizing your workflow through branches.

The way branches are named and created is a statement of intent.

Initial gitflow might seem confusing, but it provides the structure needed to
easily problem solved deployment and debugging issues.

There are two main branches in gitflow and several important namespaces.

The two main long running branch are master and develop.

Each commit to master should represent a commit to the production environment. Master should always work.

Develop is where development happens, and it is often built to staging. Ideally develop should work, but it might not always. 

When new features are being worked on they are branched from develop as feature branches. This allows the separation of 
individual features. If development on a feature stalls out or too many bugs are introduced, that feature can easily be 
isolated from the rest of develop, usually simply be not merging back in. But even if the feature branch is merged back in,
the merge commit can be reverted easily, since it is always just one merge commit.

Having a separate master an develop branch allows simple hotfixes. If there is a bug on production, branching a hotfix branch
from master will allow fixing the production bug without introducing any new features that are in ongoing development on develop.

We also use deploy branches. These are the branches that are on the actual servers, so `deploy/production` would be the branch on
the server that is built from `master`. Deploy branches allow a build step to happen followed by a cross branch commit. The 
commit message on the deploy branches always state which branch the deploy came from and also which SHA. The advantage of
having one commit per deploy on `master` / `deploy/production` is that quickly rolling back is possible using a simple `git reset --hard HEAD~1`.

The original gitflow article is located here:

http://nvie.com/posts/a-successful-git-branching-model/
