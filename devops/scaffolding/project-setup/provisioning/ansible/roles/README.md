# Roles

tags: devops, provisioning, ansible

Roles are pod organized. The directory structure of each is essentially the same.
The following directories are often found in a role:

```
- files
- meta
- tasks
- templates
```

Additionally `vars` and `defaults` may be found. Variables can be put into each
role or at the top of the directory structure. I find having all role related variables
in one place easier to manage than splitting them up.

To achieve this, you can make a `global_vars` directory at the top level. Each
file in this directory can be named based on the host group it applies to or `all`
if it applies to them all. Look at the docs for creating groups of groups, etc.

Roles can have conditional includes. These are most useful for handling various
scenarios is server environment differences (e.g. debian vs yum).

The roles to be run can be based on the host group in the `site.yml`. For example
to run a group of roles for all hosts, some for vagrant and some for staging:

```yaml
---
- name: Environment Setup
  hosts: all
  sudo: yes
  roles:
    - essentials

- name: Server setup
  hosts: staging
  sudo: yes
  roles:
    - pm2-project

- name: Dev Server setup
  hosts: vagrant
  sudo: yes
  roles:
    - node-debug
```

host and group vars: http://docs.ansible.com/intro_inventory.html#splitting-out-host-and-group-specific-data
