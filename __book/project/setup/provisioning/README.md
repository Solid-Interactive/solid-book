# Provisioning

For each project you have to setup local, staging, and production environments.

It is almost always useful to have a Vagrant environment ready to go for local dev.
In some cases you may choose to not use it - for example node apps with limited data
are often very easy to run locally, but it is very helpful to be able to setup things
like nginx and databases on a Vagrant machine, so that you can emulate the server
and not have to drastically change or break your own local environment.

Vagrant uses a headless instance of Virtualbox to setup a virtual server that is
hosted by your computer. Your computer is referred to as the host, and the virtual
machine is referred to as the guest.

Vagrant has many base boxes ready for use. It is best practive to use a Vagrant
base box - such as `ubuntu/trusty64` - and provision it to cusomtize the environment.
This is more transparent than the alternative of taking a base box, customizing it,
and then using the snapshot of the customization for deving. Having the provisioning
of a vanilla base box in version control makes what is on the box very transparent.

Vagrant allows multiple methods of provisioning. Some are Puppet, shell, and Ansible.
In our experience shell provisioning - while simplest to initially setup - is too
difficult to maintain in the long run. You end up having to put too many conditionals
in your shell script to make it work irrespective of the starting state of the box.
Also shell script usually becomes spaghetti code, and instead of thinking about the
state you want to server to be in you end up thinking about how to get the server there.

Puppet is very full featured, but many devs find the syntax and details daunting to learn.
I find the docs hard to navigate. You also have to install puppet on your servers.

We found Ansible to have the smallest learning curve and the easiest to use in
practice. The only server dependency for Ansible is SSH access to the server.
Locally you have to have ansible installed, on a Mac this is:

```shell
sudo easy_install pip
sudo pip install ansible
```

Ansible is written in python. Its commands are run in sequential order, which in my experience
makes it easier to debug than Puppet - which decdides upon the order to run things in.
