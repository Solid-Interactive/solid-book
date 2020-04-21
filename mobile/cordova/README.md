# Cordova

tags: cordova, mobile, ios, android, webview, js, javascript

## Project

## Plugins
To add a plugin:
```
# Save plugin to plugins list in package.json
cordova plugin add <plugin-name> # might need `--save`

# Remove plugins and platforms to install new plugin.
rm -rf plugins platforms

# Install new plugin with prepare.
cordova prepare # Rebuilds plugins and platforms dirs with new plugin.
```
