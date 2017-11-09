(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.9",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.8.0"
  }
}

},{}],3:[function(require,module,exports){
/**
* Emits the ```$typingIndicator.startTyping``` and ``$typingIndicator.stopTyping``` even on a {@link Chat} when a user is marked as typing or not typing.
* @module chat-engine-typing-indicator
* @requires {@link ChatEngine}
*/

/**
@function
@param {Object} [config] The plugin config object
@param {Integer} [config.timeout] Fires the "stopTyping" event if have not typed within this setting. Milliseconds.
@example

//providing a config is optional, the default timeout is 1000ms
let config = { timeout: 1000 }
chat.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator'](config));

// emit the typing event
chat.typingIndicator.startTyping();

// manually emit the stop tying event
// this is automagically emitted after the timeout period, or when a message is sent
chat.typingIndicator.stopTyping();

// typing boolean
chat.isTyping;
// False

chat.on('$typingIndicator.startTyping', (payload) => {
    console.log(payload.user, "is typing...");
});

chat.on('$typingIndicator.stopTyping', (payload) => {
        (payload.user, "is not typing.");
});
*/

module.exports = (config) => {

    // set the default for typing
    // if the client types input, we wont fire "stopTyping" unless the client
    // doesn't type anything for this timeout
    config.timeout = config.timeout || 1000;

    // create a place to store the setTimeout in
    let stopTypingTimeout = null;

    // define the methods that will be attached to the class Chat
    class extension  {
        construct() {

            // will set Chat.typingIndicator.isTyping to false immediately
            this.isTyping = false;

        }

        /**
        emit an event over the network that this user started typing
        @method typingindicator"."startTyping
        @ceextends Chat
        */
        startTyping() {

            if(!this.isTyping) {
                this.parent.emit(['$' + 'typingIndicator', 'startTyping'].join('.'));
            };

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            // kill any existing timeouts
            clearTimeout(stopTypingTimeout);

            // create a new timeout
            stopTypingTimeout = setTimeout (() => {

                // trigger stop typing after a set amount of time
                this.stopTyping();

            }, config.timeout);

        }

        /**
        @method typingindicator"."stopTyping
        @ceextends Chat
        */
        stopTyping() {

            // we must be currently typing to stop typing
            // if(this.isTyping) {

                // remove the timeout
                clearTimeout(stopTypingTimeout);

                /**
                broadcast a stoptyping event
                @event $typingIndiciator"."stopTyping
                @ceextends Chat
                */
                this.parent.emit(['$' + 'typingIndicator', 'stopTyping'].join('.'));

                // stop typing indicator
                this.isTyping = false;

            // }

        }
    }

    // define emit middleware
    let emit = {
        message: (payload, next) => {

            // it's worth noting here, we can't access ```extension``` here
            // because this function runs in a different context

            // on every message, tell the chat to stop typing
            payload.chat.typingIndicator.stopTyping();

            // continue on
            next(null, payload);
        }
    };

    // define both the extended methods and the middleware in our plugin
    return {
        namespace: 'typingIndicator',
        extends: {
            Chat: extension
        },
        middleware: {
            emit
        }
    }


};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS40L2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC45XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhdC1lbmdpbmVcIjogXCJeMC44LjBcIlxuICB9XG59XG4iLCIvKipcbiogRW1pdHMgdGhlIGBgYCR0eXBpbmdJbmRpY2F0b3Iuc3RhcnRUeXBpbmdgYGAgYW5kIGBgJHR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nYGBgIGV2ZW4gb24gYSB7QGxpbmsgQ2hhdH0gd2hlbiBhIHVzZXIgaXMgbWFya2VkIGFzIHR5cGluZyBvciBub3QgdHlwaW5nLlxuKiBAbW9kdWxlIGNoYXQtZW5naW5lLXR5cGluZy1pbmRpY2F0b3JcbiogQHJlcXVpcmVzIHtAbGluayBDaGF0RW5naW5lfVxuKi9cblxuLyoqXG5AZnVuY3Rpb25cbkBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgcGx1Z2luIGNvbmZpZyBvYmplY3RcbkBwYXJhbSB7SW50ZWdlcn0gW2NvbmZpZy50aW1lb3V0XSBGaXJlcyB0aGUgXCJzdG9wVHlwaW5nXCIgZXZlbnQgaWYgaGF2ZSBub3QgdHlwZWQgd2l0aGluIHRoaXMgc2V0dGluZy4gTWlsbGlzZWNvbmRzLlxuQGV4YW1wbGVcblxuLy9wcm92aWRpbmcgYSBjb25maWcgaXMgb3B0aW9uYWwsIHRoZSBkZWZhdWx0IHRpbWVvdXQgaXMgMTAwMG1zXG5sZXQgY29uZmlnID0geyB0aW1lb3V0OiAxMDAwIH1cbmNoYXQucGx1Z2luKENoYXRFbmdpbmVDb3JlLnBsdWdpblsnY2hhdC1lbmdpbmUtdHlwaW5nLWluZGljYXRvciddKGNvbmZpZykpO1xuXG4vLyBlbWl0IHRoZSB0eXBpbmcgZXZlbnRcbmNoYXQudHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nKCk7XG5cbi8vIG1hbnVhbGx5IGVtaXQgdGhlIHN0b3AgdHlpbmcgZXZlbnRcbi8vIHRoaXMgaXMgYXV0b21hZ2ljYWxseSBlbWl0dGVkIGFmdGVyIHRoZSB0aW1lb3V0IHBlcmlvZCwgb3Igd2hlbiBhIG1lc3NhZ2UgaXMgc2VudFxuY2hhdC50eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZygpO1xuXG4vLyB0eXBpbmcgYm9vbGVhblxuY2hhdC5pc1R5cGluZztcbi8vIEZhbHNlXG5cbmNoYXQub24oJyR0eXBpbmdJbmRpY2F0b3Iuc3RhcnRUeXBpbmcnLCAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBheWxvYWQudXNlciwgXCJpcyB0eXBpbmcuLi5cIik7XG59KTtcblxuY2hhdC5vbignJHR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nJywgKHBheWxvYWQpID0+IHtcbiAgICAgICAgKHBheWxvYWQudXNlciwgXCJpcyBub3QgdHlwaW5nLlwiKTtcbn0pO1xuKi9cblxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyBzZXQgdGhlIGRlZmF1bHQgZm9yIHR5cGluZ1xuICAgIC8vIGlmIHRoZSBjbGllbnQgdHlwZXMgaW5wdXQsIHdlIHdvbnQgZmlyZSBcInN0b3BUeXBpbmdcIiB1bmxlc3MgdGhlIGNsaWVudFxuICAgIC8vIGRvZXNuJ3QgdHlwZSBhbnl0aGluZyBmb3IgdGhpcyB0aW1lb3V0XG4gICAgY29uZmlnLnRpbWVvdXQgPSBjb25maWcudGltZW91dCB8fCAxMDAwO1xuXG4gICAgLy8gY3JlYXRlIGEgcGxhY2UgdG8gc3RvcmUgdGhlIHNldFRpbWVvdXQgaW5cbiAgICBsZXQgc3RvcFR5cGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gICAgLy8gZGVmaW5lIHRoZSBtZXRob2RzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgY2xhc3MgQ2hhdFxuICAgIGNsYXNzIGV4dGVuc2lvbiAge1xuICAgICAgICBjb25zdHJ1Y3QoKSB7XG5cbiAgICAgICAgICAgIC8vIHdpbGwgc2V0IENoYXQudHlwaW5nSW5kaWNhdG9yLmlzVHlwaW5nIHRvIGZhbHNlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICBlbWl0IGFuIGV2ZW50IG92ZXIgdGhlIG5ldHdvcmsgdGhhdCB0aGlzIHVzZXIgc3RhcnRlZCB0eXBpbmdcbiAgICAgICAgQG1ldGhvZCB0eXBpbmdpbmRpY2F0b3JcIi5cInN0YXJ0VHlwaW5nXG4gICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBzdGFydFR5cGluZygpIHtcblxuICAgICAgICAgICAgaWYoIXRoaXMuaXNUeXBpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0YXJ0VHlwaW5nJ10uam9pbignLicpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgY2FsbGVkIG1hbnVhbGx5IGJ5IHRoZSBjbGllbnRcblxuICAgICAgICAgICAgLy8gc2V0IGJvb2xlYW4gdGhhdCB3ZSdyZSBpbiBtaWRkbGUgb2YgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8ga2lsbCBhbnkgZXhpc3RpbmcgdGltZW91dHNcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyB0aW1lb3V0XG4gICAgICAgICAgICBzdG9wVHlwaW5nVGltZW91dCA9IHNldFRpbWVvdXQgKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgc3RvcCB0eXBpbmcgYWZ0ZXIgYSBzZXQgYW1vdW50IG9mIHRpbWVcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgfSwgY29uZmlnLnRpbWVvdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgQG1ldGhvZCB0eXBpbmdpbmRpY2F0b3JcIi5cInN0b3BUeXBpbmdcbiAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIHN0b3BUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHdlIG11c3QgYmUgY3VycmVudGx5IHR5cGluZyB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgLy8gaWYodGhpcy5pc1R5cGluZykge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0aW1lb3V0XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIGJyb2FkY2FzdCBhIHN0b3B0eXBpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICBAZXZlbnQgJHR5cGluZ0luZGljaWF0b3JcIi5cInN0b3BUeXBpbmdcbiAgICAgICAgICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmVtaXQoWyckJyArICd0eXBpbmdJbmRpY2F0b3InLCAnc3RvcFR5cGluZyddLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzdG9wIHR5cGluZyBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGVtaXQgbWlkZGxld2FyZVxuICAgIGxldCBlbWl0ID0ge1xuICAgICAgICBtZXNzYWdlOiAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBpdCdzIHdvcnRoIG5vdGluZyBoZXJlLCB3ZSBjYW4ndCBhY2Nlc3MgYGBgZXh0ZW5zaW9uYGBgIGhlcmVcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiBydW5zIGluIGEgZGlmZmVyZW50IGNvbnRleHRcblxuICAgICAgICAgICAgLy8gb24gZXZlcnkgbWVzc2FnZSwgdGVsbCB0aGUgY2hhdCB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LnR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIG9uXG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBib3RoIHRoZSBleHRlbmRlZCBtZXRob2RzIGFuZCB0aGUgbWlkZGxld2FyZSBpbiBvdXIgcGx1Z2luXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAndHlwaW5nSW5kaWNhdG9yJyxcbiAgICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgIH0sXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIGVtaXRcbiAgICAgICAgfVxuICAgIH1cblxuXG59O1xuIl19
