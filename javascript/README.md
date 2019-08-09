# JavaScript

tags: javascript

## Scope

Working with modern JS methods, it's easy to forget about scope pollution. In vanilla JavaScript, a simple way to ensure you do not pollute the global namespace and can expose what you see fit is using the IIFE (Immediately Invoked Function Expression):

```javascript
(function($) {
    const $imNotPolluting = $("#blah");
    const $thisWillBeGlobal = $("input", $imNotPolluting);
    
    window.$blahInputs = $thisWillBeGlobal;
})(jQuery);
```

References: 

* http://benalman.com/news/2010/11/immediately-invoked-function-expression/
* http://markdalgleish.com/2011/03/self-executing-anonymous-functions/
