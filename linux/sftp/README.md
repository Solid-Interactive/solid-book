# SFTP

tags: linux, sftp

SFTP is FTP over SSH. It can be setup with either keypairs or passwords.

A simple way to manage SFTP users is to put them all in one group and match on that group for SFTP access.

Here are the steps to create a sample SFTP user with password access.

First the parent directory of the user's sftp directory must be owned by `root:root` and have `755` permissions. Because of this restriction, you might have to symlink the sftp directory to where you want it to ultimately show up.

```bash
# create a root directory
sudo mkdir /var/sftp
```

Then create your sftp user. This user should have a home directory nested in the root sft directory. In this case we're going to add them to the `www-data` group, to give them access to a Wordpress uploads directory.

```bash
# create a user with their home directory in the root directory
sudo useradd -d /var/sftp/uploads -G www-data ftpuser --shell /usr/sbin/nologin
```

Now add a password to the user:

```bash
echo -e "my_secure_password\nmy_secure_password" | sudo passwd ftpuser
```

Verify the information:

```bash
grep ftpuser /etc/passwd
grep www-data /etc/group
```

Add any symlinks needed:

```bash
sudo ln -s /var/sftp/uploads /var/www/vhosts/www.example.com/wp-content/uploads
```

We will next modify the SSH config to allow SFTP access for this user:

```bash
sudo vim /etc/ssh/sshd_config
```

First comment out the following line:

```
Subsystem sftp /usr/lib/openssh/sftp-server
```

Add the following to the end of the file

```bash
#Subsystem sftp /usr/lib/openssh/sftp-server
Subsystem www-data internal-sftp # Use in-process SFTP server
Match Group sftp
  ChrootDirectory %h                 # Prevent user access to anything beyond their home folder
  #ChrootDirectory /var/sftp/uploads # can also hard code a directory for ChrootDirectory   
  X11Forwarding no               # Disable X11 forwarding
  AllowTcpForwarding no          # Disable tunneling
  AllowAgentForwarding no        # Disable port forwarding
  PermitTunnel no                # Disable network tunneling
  ForceCommand internal-sftp 
```

Before restarting SSH test the config file:

```bash
sshd -t
```

If you do not do this, you risk getting locked out of your server!

If everything looks good restart SSH and test your SFTP access:

```bash
sudo service ssh restart
```

## Debugging

If you are having trouble connecting, then tail the auth log. You will usually see the cause of the error:

```bash
tail -f /var/log/auth.log
```

## References

* [Setting up an SFTP server and users on Ubuntu 16.04](http://www.inanzzz.com/index.php/post/ef2z/setting-up-a-sftp-server-and-users-on-ubuntu-16-04)
