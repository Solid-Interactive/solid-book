# JavaScript

tags: javascript

## Scope

Working with modern JS methods, it's easy to forget about scope pollution. In vanilla JavaScript, a simple way to ensure you do not pollute the global namespace and can expose what you see fit is using self executing functions:

```javascript
(function($) {
    const $imNotPolluting = $("#blah");
    const $thisWillBeGlobal = $("input", $imNotPolluting);
    
    window.$blahInputs = $thisWillBeGlobal;
})(jQuery);
```

Reference: http://markdalgleish.com/2011/03/self-executing-anonymous-functions/
