# Vagrant

tags: vagrant, virtual box

How to add a locally downloaded vagrant box:

On the command line:

```bash
vagrant box add my-box ~/Downloads/my-box
```

In you `Vagrantfile`

```ruby
  config.vm.box = "my-box"
```
