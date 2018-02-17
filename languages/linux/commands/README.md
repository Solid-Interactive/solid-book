# Common Shell Commands

tags: linux, commands

## Check if command exists from script

```
command -v foo >/dev/null 2>&1
```

http://stackoverflow.com/a/677212/186636

## Curl

To display prettified JSON:

```
curl http://something.blah.yad | python -m json.tool
```

## Disk usage

```
# disk usage, human readable
du -chs /*
# disk usage, summary per directory
du -sh

# free space
df -h

free -h

# directories that use a gig or over
du -h / | grep '[0-9\.]\+G'
```

## Dpkg

List where apt-get installed something

```
dpkg -L nginx
```

## Last reboot

```
who –b
```

## Links

Creating a symbolic link:

```
ln -s from to
```

## Means

To calculate the mean of a column of numbers in a file:

```shell
awk '{ total += $1; count++ } END { print total/count }' nocache.log
```

Awk is a program for dealing with files with columns. `$1` means the first column.
The command `total += $1; count++` runs for each row.

## Open

* Open a url with the default browser:

```shell
open http://localhost:4000
```

This command is often useful after running a watch task or something similar. A
background process can be used to solve the problem of using a task that doesn't
exit until you are done with it:

```
(sleep 3; open http://localhost:4000)&; someSortOfWatchTask
```

The `&` symbol can be used to launch a background task.

## Ports

To get the pid of a process running on a port, use `lsof` (list open files):

This will get the pid the process(es) running on port 4000.

```
lsof -t -i:4000
```

To kill them:

```
kill $(lsof -t -i:4000)
```

## Scp

Scp is for copying content over ssh.

You can use your ssh aliases when defining the to and from locations:

```
scp -r exampleStaging:/some/directory ~
```

## Ssh

Open an SSH tunnel to example.com port 22 and use your local port 27018 to
map to example.com's 27017.

Something like this is useful for interacting with a locally bound process (e.g.
  mongo, mysql, elasticsearch...).

```shell
ssh -L27018:localhost:27017 user@example.com -p 22
```

You can get more complicate, for example if you want Object Rocket to think you are example.com from your machine:

```shell
ssh -L38945:something.objectrocket.com:38945 user@example.com
```

Now you can use your port 38945 as if you were on example.com... allowing cli mongo login as well as Robomongo, etc access.

You can use the -N flag for non interactive tunneling.

You can also store your connections in a sock file for easy closing later:

```shell
# open and background manually ---- not with -f flag
(ssh -N -L 9200:localhost:9200   -M -S /tmp/ssh_tunnel_9200_%h.sock $SSH_HOST_E)&

# some point later close
ssh -S /tmp/ssh_tunnel_9200_%h.sock  -O exit $SSH_HOST
```

## Tar

There are two very common combination of flags in conjunction with the `tar` command:

```
# extract files with verbose output
tar -xvf some.file.tar.gz

# compress files with verbose output
tar -zcvf some.file.to.create.tar.gz directory-to-compress
```

If you want to delete the files as they get compressed, use the `--remove-files` flag.
This has to be the first flag used, or `tar` will think it's a file.

```
tar --remove-files a.tar.gz b
```

The `--remove-files` flag is not supported by the `tar` command that ships with
Mac, but gnu tar does:

```
brew instasll gnu-tar
```

## Number of cores

```
cat /proc/cpuinfo | awk '/^processor/{print $3}' | wc -l
```

## Permission
Change permission on a file:
```
chmod 0755 <file>
```
* positions: user, group, everyone
* read: 4
* write: 2
* execute: 1

## Tail with grep
```
tail -f <file> | grep --line-buffered <pattern>
```
