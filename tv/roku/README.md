# Roku

tags: roku, tv

* [Development and Deploying](/tv/roku/development)
* [Debugging](/tv/roku/debugging)
* [Events](/tv/roku/events)
* [Focus](/tv/roku/focus)

## Conditional Compilation

* https://sdkdocs.roku.com/display/sdkdoc/Conditional+Compilation



## SceneGraph

[SceneGraph](https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+Core+Concepts) is a framework that can be used to create
screens within an Roku app.

* [SceneGraph Core Concepts](https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+Core+Concepts)
* [SceneGraph API Reference](https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+API+Reference)

Examples:

* [Dialogs](https://sdkdocs.roku.com/display/sdkdoc/Dialogs+Markup)



## Entry Points

* [Init function](https://sdkdocs.roku.com/pages/viewpage.action?pageId=1608546) - called after XML parsed
* [onKeyEvent](https://sdkdocs.roku.com/pages/viewpage.action?pageId=1608547) - receives remote control key events

## Including `.brs` files

xml files can include BrightScript directly. If you want to separate out your BrightScript files, do it with `script`
tags:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<component name="LogOutDialog" extends="Dialog">
	<script uri="LogOutDialog.brs" type="text/brightscript"></script>
</component>

```


## Resolution
* Docs: https://sdkdocs.roku.com/display/sdkdoc/Specifying+Display+Resolution
* Roku's recommendation:
* In `manifest`, declare `ui_resolutions=fhd`
* Size ui elements for fhd (1080p), in values divisible by 3.
* Roku will autoscale the ui when the display is 720p, and values divisible by 3 will produce integer sizes.
* Use images that match the final scaled down size the image will display at.
  * ex: size element width 276; width will autoscale to 184 on 720p; if image, use image with width of 276 on 1080p, and image with width of 184 on 720p; see below for getting the current resolution.
* Get ui resolution from your root scene object
  * Docs: https://sdkdocs.roku.com/display/sdkdoc/Scene
  * ex: `resAssocArray = rootScene.currentDesignResolution()`

### Image resources based on resolution

In the manifest you can put the variable key and variables to replace the key with for sd, hd, and full hd:

```
uri_resolution_autosub=$$RES$$,SD,720p,1080p
```

Then, you can use `$$RES$$` in xml attributes or brs:

```brightscript
m.SEARCH_BLURRED = "pkg:/images/nav-search-blurred-$$RES$$.png"
```

```xml
<Poster
  uri="pkg:/images/nav-logo-$$RES$$.png"/>
```

## Colors
* Colors are specified with a string formatted like so: `"0xRRGGBBAA"`, where RRGGBB is the standard 6-digit hex code, and AA specifies the alpha channel, `FF` fully opaque, and `00` fully transparent.
* Use this chart to convert decimal opacity to hexidecimal: http://online.sfsu.edu/chrism/hexval.html
* Colors can also be declared without strings by prefixing the hex code with `&h`, e.g. `&h0a0b0d`

## Open Questions
* Add open questions here.

## Images
* Use the `Poster` node, with the `uri` field. `<Poster uri="/image.jpg" />`
* If you want to use a packaged image use the format: `uri="pkg:/images/image.jpg`
* Roku can resize images on the fly so that they use less texture memory (though the original image size should be close to the target size, because the original size has to be loaded into memory in order to be scaled down.)
* example
  ```xml
  <Poster
    id="thumbnail"
    loadDisplayMode="limitSize"
    loadWidth="256"
    loadHeight="384"
    uri="http://image.example.com/800x1200.jpg"/>
  ```
  * Note: `load...` fields must be set before `uri` for the load scaling to work.

## Borders
* No border functionality built in. Use a `Rectangle` node for each side of your node.

## Positioning
* Use field `translation` to position an element relative to its parent.
* Every node defines its own new coordinate system.
* example:
  ```xml
  <Rectangle
    translation="[0, 100]">
    <Rectangle
      id="rec2"
      translation="[0, 100]">>
    </Rectangle>
  </Rectangle>
  ```
  `rec2` will start 200px down the page.

## Fonts
* Define the font settings on a `Font` node inside a `Label` node.
* example:
  ```xml
  <Label
    text="Hello, Roboto">
    <Font
      role="font"
      uri="pkg:/fonts/Roboto.otf"
      size="28"/>
  </Label>
  ```
  `role` attribute is required.

## Gradients

Use a [Poster](https://sdkdocs.roku.com/display/sdkdoc/Poster) node with an image background. Images should fit Posters as close as possible.

[Mask Groups](https://sdkdocs.roku.com/display/sdkdoc/MaskGroup) have some promise, but we've found cross device support lacking and their implementation tricky.

## Brightscript
* `sub` vs `function` - sub can only return void; any other value with error on compile.

## Functions

Functions can be declared with `sub` or `function`. A `sub` can only return `void`. A `function` can return other things.

A `sub` is a `function` without a return type.

## Multi Threading

SceneGraph introduced the concept of [multithreading](https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+Threads).

Render thread execution is limited to 3 seconds on side loaded channels and 10 seconds
on production channels.

To do something on another thread, use a [Task](https://sdkdocs.roku.com/display/sdkdoc/Task).

## Optimization

Keep init methods as small as possible.

Optimization References:

* https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+Performance+Guide
* https://sdkdocs.roku.com/display/sdkdoc/Optimization+Techniques
* https://sdkdocs.roku.com/display/sdkdoc/Performance+FAQ

## Persistent storage

* Use the registry: https://sdkdocs.roku.com/display/sdkdoc/roRegistry
* Place registry sections in the registry: https://sdkdocs.roku.com/display/sdkdoc/roRegistrySection
* To reset the registry, delete the app and restart the roku.

## Roku device models

* [Roku Supported models](https://sdkdocs.roku.com/display/sdkdoc/The+Roku+Channel+Developer+Program#TheRokuChannelDeveloperProgram-SupportedModels)
* [Overview of Roku Models](https://en.wikipedia.org/wiki/Roku)

## Packaging and publishing
* Packaging a channel for publishing is done on the roku device.
* A packaging key is used to sign the channel package.
* A packaging key can be generated for the initial channel package.
* Updates to the channel should be packaged with the initial key. The packaging key is embedded in the packaged channel, and you can rekey the roku device with a key from an existing packaged channel.
* Each channel should have a unique packaging key.

### Generate packaging key
* Run `telnet <roku-ip> 8080`
* Then at prompt, enter `genkey`
* Copy DevId and password.

### Package a channel
* Side load the channel to be packaged.
* Open roku ip (e.g. 192.168.2.3) in web browser (user: rokudev, password: set when dev mode activated on roku device).
* Select Packager from tabs.
* Add channel name, and enter password from genkey.

### Rekey roku device from packaged channel
* Open roku ip in web browser.
* Select Utilities from tabs.
* Upload package, enter password, and select rekey.
* Your device is now ready to package an update to the channel you rekeyed from.
* Note: apps sideloaded in dev mode will now use the dev key of the packaged app, and roku will consider them the "same app" in that they will share a registry. This is helpful for testing how an app update you are developing will interact with the existing live, packaged version. However, the channelClientId will be different between the packaged and dev versions.

### Publish packaged channel
* Upload here: https://developer.roku.com/developer-channels/channels
* Private, non-certified channels don't have to be certified by roku and can be installed with an access code created for you at time of channel creation.

## Dev mode script flag
* Check if app is running in dev mode (side-loaded) with the `roAppInfo` object, `createObject("roAppInfo").isDev()`
