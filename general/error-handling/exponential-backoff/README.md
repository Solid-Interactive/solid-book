# Exponential Back Off

Exponential back off is useful when dealing with things that can sporadically fail. For example if a server is under load,
a request might fail now, but it might work a few seconds later. This strategy eases pressure on the server, and the more times you try something and it fails,
the less likely it will work in the near future, so you can try at longer and longer intervals.

You should set a cap on the number of times to try.

[code](http://jsfiddle.net/pajtai/pLka0ow9/)
