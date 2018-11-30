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
 
 To query [node focus](https://sdkdocs.roku.com/display/sdkdoc/ifSGNodeFocus), use [`hasFocus`](https://sdkdocs.roku.com/display/sdkdoc/ifSGNodeFocus#ifSGNodeFocus-hasFocus()asBoolean) to determine if the node
 itself has focus. Use [`isInFocusChain`](https://sdkdocs.roku.com/display/sdkdoc/ifSGNodeFocus#ifSGNodeFocus-isInFocusChain()asBoolean) to determine if the node or a child has focus. 

## Resolution
* Docs: https://sdkdocs.roku.com/display/sdkdoc/Specifying+Display+Resolution
* Roku's recommendation:
  * In `manifest`, declare `ui_resolutions=fhd`
  * Size ui elements for fhd (1080p), in values divisible by 3.
  * Roku will autoscale the ui when the display is 720p, and values divisible by 3 will produce integer sizes.
  * Use images that match the final scaled down size the image will display at.
  * ex: size elemet width 276; width will autoscale to 184 on 720p
  
* Get ui resolution from your root scene object
  * Docs: https://sdkdocs.roku.com/display/sdkdoc/Scene
  * ex: `resAssocArray = rootScene.currentDesignResolution()` 

## Colors
* Colors are specified with a string formatted like so: `0xRRGGBBAA`, where RRGGBB is the standard 6-digit hex code, and AA specifies the alpha channel, `FF` fully opaque, and `00` fully transparent.

## Open Questions
* How to render border on element?
