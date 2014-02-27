browser-notify
==============

This small wrapper for the native Notification API 
provides a neat interface and manages the permission 
requesting as well as listener, which will be called 
on notification bubble click.
 
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

notify() exposes the current setting of the users desktop notifications.

```javascript
console.log(notify().state);
// -1: disabled or not supported
// 0: default (not yet allowed or disabled)
// 1: allowed
```