# Ansible

Ansible allows you to guarantee an environment on one or many servers. At a high
level you run a playbook that has roles made up of tasks. Each role is a functional
chunck. For example there can be a "git" role that ensures git 2.3+ is available.

It is a good idea to separate general from project specific roles. For example
you could have an `nginx` role and an `nginx-project` role.

One of the nice things about Ansible is that it doesn't require anything else
than having Ansible installed locally and ssh access to the servers being
managed.

To install Ansible on a Mac use `pip`:

```shell
sudo easy_install pip
sudo pip install ansible
```

If you are testing things out on vagrant - and not using just plain `vagrant up` - and need to use a password with ssh,
you might have to [install `sshpass`](http://fauxzen.com/installing-sshpass-os-x/).
Though you don't need to install anything extra if you are simply using Ansible
as a provisioning agent for Vagrant.

We'll put everything in a directory. Create the directory and then we'll start by
setting up an Ansible hosts file. Below is an example setting up 2 vagrant boxes
at the same time. To follow along, setup vagrant in two separate directories with:

```
config.vm.network "private_network", ip: "192.168.12.148"
```

and

```
config.vm.network "private_network", ip: "192.168.12.158"
```

For example:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
        # max specific
        # Give VM 1/4 system memory & access to all cpu cores on the host
        cpus = `sysctl -n hw.ncpu`.to_i
        # sysctl returns Bytes and we need to convert to MB
        mem = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4
        v.customize ["modifyvm", :id, "--memory", mem]
        v.customize ["modifyvm", :id, "--cpus", cpus]
  end

  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.12.158"
end
```

[Parameters you can add to a hosts file](http://docs.ansible.com/intro_inventory.html#list-of-behavioral-inventory-parameters)

```
[vagrant]
192.168.12.148 ansible_ssh_user=vagrant ansible_ssh_pass=vagrant
192.168.12.158 ansible_ssh_user=vagrant ansible_ssh_pass=vagrant
```

Once vagrant is running (`vagrant global-status`), we can give things a test. Note
that you might have to manaully login once to add the RSA key fingerprints of the
Vagrant boxes. Then run the following:

```shell
» ansible -m ping vagrant -i hosts
```

You should see:

```
192.168.12.158 | success >> {
    "changed": false,
    "ping": "pong"
}

192.168.12.148 | success >> {
    "changed": false,
    "ping": "pong"
}
```

User roles to organize playbooks.

https://github.com/ansible/ansible-examples
