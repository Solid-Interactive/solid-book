# Creating an Ansible playbook

tags: devops, provisioning, ansible

You can create an Ansible playbook with a set of roles. You will usually run roles
based on the host groups. You will probably end up running similar - though slightly different -
roles for your different host groups (local, staging, production).

You can quickly setup an Ansible playbook with a corresponding Vagrantfile using
the `ansible-ubuntu` npm. To use the npm, install it, then run it in the directory
you want your `Vagrantfile`:

```shell
npm install -g ansible-ubuntu
cd ~/projects/my-new-project
ansible-ubuntu -v
```

The npm will prompt you for the roles you want included in your playbook.
After running it you will get an `ansible` directory and a `Vagrantfile`. You can
use these as a starting point for setting up your project specific playbook.

The `hosts` file lists the ips of the servers to provision. You can list multiple
name groups and pass variables based on the host. Ansible has docs on how to do this
in the hosts or inventory files.

The ansible-ubuntu npm adds a `vagrant` named group to be provisioned by vagrant.
If you update the private ip of the Vagrant box in the `Vagrantfile`, you have to
update the ip in the hosts file too.

To restrict Vagrant to only provision the `vagrant` named group, `ansible-limit` is used in
the `Vagrantfile`:

```
config.vm.provision :ansible do |ansible|
   ansible.playbook = "ansible/site.yml"
   ansible.inventory_path = "ansible/hosts"
   ansible.limit = "vagrant"
   ansible.verbose = "v"
end
```

To share a directory between the hosts and guest, you can uncomment and modify
this line in the `Vagrantfile`:

```
# config.vm.synced_folder "./", "/var/www/vhosts/example/source", nfs: true
```

The first quoted path is the path on the host, and the second is the path on the guest.
