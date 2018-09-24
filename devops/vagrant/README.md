# Vagrant

tags: vagrant, virtual box, debugging

How to add a locally downloaded vagrant box:

On the command line:

```bash
vagrant box add my-box ~/Downloads/my-box
```

In you `Vagrantfile`

```ruby
  config.vm.box = "my-box"
```

## Debugging: Exports files is invalid

If you move directories in which you've up vagrant instances, you'll end up getting an error related to the export file is invalid. Inspect and fix `/etc/exports` and then rerun the provisioning.

Sometimes it's easiest to delete the `/etc/exports` entry and shutoff and completely delete the Vagrant box and start from `vagrant up` again.
