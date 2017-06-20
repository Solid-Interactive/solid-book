# Vagrant

## Debugging

Add this in your config to see the ui:

```
config.vm.provider :virtualbox do |vb|
  vb.gui = true
end
```

then run `vagrant up` or `vagrant reload`
