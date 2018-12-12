# Roku: Events

tags: roku, events


Roku let's you observe fields on other nodes using `node.observeField("fieldName", callback)`.

`callback` is a function on the component doing the observing.

If the field is on the component itself, then you can add the `onChange` attribute with the callback to the component instead
of using the `observeField` method. However, do not that [`onChange` is usually executed on the render thread](https://sdkdocs.roku.com/display/sdkdoc/Optimization+Techniques).

The allowed types for reactive fields are listed [here](https://sdkdocs.roku.com/display/sdkdoc/interface#interface-Attributes)

### AppState

[Global scope](https://sdkdocs.roku.com/display/sdkdoc/SceneGraph+Data+Scoping#SceneGraphDataScoping-GlobalScope) can be used
to store transient App State.

#### Example AppState Implementation

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
* Note that the signature for the handlers must accept an `Object`. The event is passed to the handler, not the field.
    ```brs
    sub handler(event as Object)
    ```
* Add fields to the app state interface in `AppState.xml`.
    * Add change listeners if you need to update other fields based on field changes.
    ```xml
    <field id="myStringField" type="string" onChange="changeHandler"/>
    ```

### Key Press Events

Key press events start at the most nested element and are bubbled up.

[`onKeyEvent`](https://sdkdocs.roku.com/pages/viewpage.action?pageId=1608547) is called up the
entire chain. The second argument is used to pass to the next element up the chain what the previous element returned.
By convention, returning true means the keypress was handled, and returning false means it was not.

