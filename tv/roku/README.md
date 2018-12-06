# Roku

tags: roku, tv

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

## AppState

[Global scope](https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+Data+Scoping#SceneGraphDataScoping-GlobalScope) can be used
to store transient App State.

### Example AppState Implementation

Sample AppState XML:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<component name="AppState">
    <script uri="AppState.brs" type="text/brightscript"/>
	<interface>
        <field id="isLoggedIn" type="boolean" value="true"/>
    </interface>
</component>
```

Adding app state to `m.global`:

```brs
' Add AppState to m.global - do this in a Scene's BrightScript
m.global.addFields({
        appState: createObject("roSGNode", "AppState")
})
```

* Manage global app state with the `appState` node on the global node.
* Update the global state with assignment from components
    ```brs
    m.global.appState.myStringField = "Hello"
    ```
* Observe the state fields in your components to update the ui based on state changes.
    ```brs
    m.global.appState.observeField("myStringField", "handler")
    ```
* Add fields to the app state interface in `AppState.xml`.
    * Add change listeners if you need to update other fields based on field changes.
    ```xml
    <field id="myStringField" type="string" onChange="changeHandler"/>
    ```

## Focus
### Set focus
* Docs: https://sdkdocs.roku.com/display/sdkdoc/ifSGNodeFocus
* Call `node.setFocus(true)` on a node to focus it.
* example:
  ```brs
  myNode.setFocus(true)
  ```

### Respond to focus events
* Docs: https://sdkdocs.roku.com/display/sdkdoc/Node
* Observe field `focusedChild`
* `focusedChild` is set everytime itself or one of its children gains **OR** loses focus.
* Use `node.hasFocus()` to determine if node is focused.
* General pattern is to focus a component, and let the component delagate focus to one of its children.
* example:
  ```brs
  sub init()
      m.top.observeField("focusedChild", "onFocusedChild")
  end sub

  sub onFocusedChild()
      ' Generally, we don't need to handle this focus if
      ' this node does not have focus.
      if (NOT m.top.hasFocus())
          return
      end if

      ' If this node does not have focus, delegate focus to child
      ' based on state/business rules.
      myDefaultFocusedChild.setFocus(true)
  end sub
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

## Colors
* Colors are specified with a string formatted like so: `"0xRRGGBBAA"`, where RRGGBB is the standard 6-digit hex code, and AA specifies the alpha channel, `FF` fully opaque, and `00` fully transparent.
* Use this chart to convert decimal opacity to hexidecimal: http://online.sfsu.edu/chrism/hexval.html
* Colors can also be declared without strings by prefixing the hex code with `&h`, e.g. `&h0a0b0d`

## Open Questions
* Add open questions here.

## Images
* Use the `Poster` node, with the `uri` field. `<Poster uri="/image.jpg" />`
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

## Development and Deploying

There are several options for deploying:

* [roku-deploy npm](https://www.npmjs.com/package/roku-deploy)
* [Roku Development VS Package](https://marketplace.visualstudio.com/items?itemName=fuzecc.roku-development)
  * Setup configs per readme and the `Cmd-Shift-P` to issue commands
  * Note that you have to open your projects directory that contains only the Roku files, since this Package bundles up the currently root directory
* [BrightScript VS package](https://marketplace.visualstudio.com/items?itemName=celsoaf.brightscript)
  * Note that `v1.3.0` does not work for deploying. The highlight does work.

### VIM

Via [Vundle](https://github.com/VundleVim/Vundle.vim): Add `Plugin 'chooh/brightscript.vim'` to your `.vimrc` and run `:PluginInstall`

## Debugging
* Roku device exposes info on three ports. See ports, and commands available on each, here: https://sdkdocs.roku.com/display/sdkdoc/Debugging+Your+Application
* Connect to the device with a telnet client, e.g. `nc` on macOS
  ```bash
  $ nc <roku_ip> <port>
  ```
  Once connected, issue commands to get info:
  ```bash
  > loaded_textures
  ```
* Use the brightscript console to get info about brightscript variables, pause execution, and step through code.
  * The VSCode extension is great for setting breakpoints and stepping though code.
    * [BrightScript VS package](https://marketplace.visualstudio.com/items?itemName=celsoaf.brightscript)
    * Note that `v1.3.0` broke deploying. Hopefully open issue will be resolved soon. Use Previous version.
    * Set breakpoints in your code and execution will stop on those lines. Hover expressions to view their current value.
* Use the debug server to get non-brightscript info, like memory usage.
