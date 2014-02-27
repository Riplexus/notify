notify
==============

*Background: The Notification API allows you to notify your user even if the page 
is currently not in focus. You can remind him of new emails, incoming articles or
any important update in your application.*


This is a small wrapper for the W3C-specified Notification API. It provides a neat 
interface and manages the permission requesting. You can add multiple listeners, 
which will be called on notification bubble click to perform any action fitting to 
your message.
 
```javascript
notify('1 new message');
```

```javascript
notify('1 new message').then(function() {
    // User clicked on the notification bubble.
    // Maybe you want to redirect him to another page.
});
```

If you want, you can pass a function to create your message for you.

```javascript
notify(function(done) {
    // asynchronous calls are supported as well
    setTimeout(function() {
        done('1 new message');
    }, 0);
});
```

*Note:* If the User has not yet allowed or disabled desktop notifications, 
the permission will be requested. This is limited by the browser to user 
generated events, e.g. a click and will fail to do anything, if you call 
notify anywhere else.

```javascript
document.querySelector('button').onclick = function() {
    notify('Notifications enabled');
}
```

notify() exposes the current state of the users desktop notifications.

```javascript
console.log(notify().state);
// -1: disabled or not supported
// 0: default (not yet allowed or disabled)
// 1: allowed
```

License
=======

The MIT License (MIT)

Copyright (c) 2014 Riplexus

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.