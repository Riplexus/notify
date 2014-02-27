browser-notify
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