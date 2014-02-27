(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.notify = factory();
    }
}(this, function () {

    /**
     * This small wrapper for the native Notification API 
     * provides a neat interface and manages the permission 
     * requesting as well as listener, which will be called 
     * on notification bubble click. 
     * 
     * @param {Function|String} msg
     * @author Riplexus <Riplexus@gmail.com>
     */
    
    var notify = function(msg) {
        if (!(this instanceof notify)) {
            return new notify(msg);
        }

        var that = this,
            queue = [],
            listeners = [],
            request = function() {
                if (that.state === 0) {
                    Notification.requestPermission(function(permission) {
                        if (permission === "granted") {
                            that.state = 1;
                            flush();
                        } else {
                            that.state = -1;
                        }
                    });
                }
            },
            onclick = function() {
                for(var i=0, l=listeners.length;i<l;i++) {
                    listeners[i]();
                }
            },
            flush = function() {
                if (that.state === 1) {
                    while(queue.length) {
                        (new Notification(queue.shift()))
                            .addEventListener('click', onclick);
                    }
                }
            },
            send = function(createMessage) {
                if (typeof createMessage === 'string') {
                    var msg = createMessage;
                    createMessage = function(done) {
                        done(msg);
                    };
                }
                if (typeof createMessage !== 'function') {
                    return;
                }

                createMessage(function(msg) {
                    if (typeof msg === 'string') {
                        queue.push(msg);
                    }

                    if (that.state === 0) {
                        request();
                    } else {
                        flush();
                    }
                });
            };

        // Provide click callback function.
        this.then = function(fn) {
            listeners.push(fn);
            return that;
        };

        // If Notifications are not supported or disabled, do nothing.
        if (!('Notification' in window &&
            Notification.permission !== 'denied')) {
            this.state = -1;
            return;
        }

        this.state = +(Notification.permission === 'granted');

        // Send notification.
        send(msg);
    };
    
    return notify;
    
}));