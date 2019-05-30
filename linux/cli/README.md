# Creating cli commands

tags: linux, cli

## Example

```shell
#!/usr/bin/env bash
#set -x # for debugging

    while test $# -gt 0; do
        case "$1" in
            -h|--help)
                echo "Ansible provisioning"
                echo " "
                echo "Provisions servers via Ansible. Must be run from project root"
                echo " "
                echo "options:"
                echo "-h, --help        show help"
                echo "-s|--staging      provision staging servers"
                echo "-p|--production   provision production servers"
                exit 0
                ;;
            -s|--staging)
                shift
                ENVIRONMENT="staging"
                ;;
            -p|--production)
                shift
                ENVIRONMENT="production"
                ;;
            *)
                break
                ;;
        esac
    done

ansible-playbook ansible/site.yml -l $ENVIRONMENT -i ansible/hosts --ask-sudo-pass

```

`#!/usr/bin/env bash` is more flexible than `#!/bin/bash/`. This means no flags on the first line and have to use, `set -x` for flags.

Use `while` and `shift` to grab the flags from the comand. Use `-h` to echo help and stop.

Can alias it once done, e.g. alias `provision=./home/user/provision` or `ln -s` it to somewhere `$PATH` looks... example: `ln -s /home/user/provision /usr/bin/local/provision`.

Example of, "if then else":

```shell
if [ -n "$MYSQL_DB" ]; then echo "custom mysql db set to $MYSQL_DB"; else MYSQL_DB=$THE_THEME; fi
```

[Other similar example](https://gist.github.com/pajtai/de2315fafde61e82ac17)

Useful flags: 
* `-e` stops on first error. 
* `-x` expands all commands (great for debugging). 
* `-u` can't refer to uninitialized variables.
