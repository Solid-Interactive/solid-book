# Roku: Focus

tags: roku, focus, events

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
* observing field is generally needed for initial and final focus. Once focus is within an element, key presses on that element generally handle focus changes on child elements.
* `focusedChild` is set every time it gains **OR** loses focus
  * focus changes within an element are not captured
* Use `node.hasFocus()` to determine if node is focused.
* General pattern is to focus a component, and let the component delegate focus to one of its children.

Example

```brs
sub init()
    m.top.observeField("focusedChild", "onFocusedChild")
end sub

sub onFocusedChild()

    if (NOT m.top.isInFocusChain())
        ' handle losing focus
        removeFocusFromAllChildItems()
        return
    end if
    
    if (m.top.hasFocus())
        print "element is gaining initial focus"
        setInitialFocus()
    end if
end sub
```

To check whether an element or any of its descendants is focused, use `m.top.isInFocusChain()`
