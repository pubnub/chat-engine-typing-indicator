(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.6",
  "main": "src/plugin.js",
  "open-chat-framework": {
    "namespace": "typing-indicator"
  },
  "dependencies": {
    "chat-engine": "^0.5.2"
  }
}

},{}],3:[function(require,module,exports){
/**
* @module chat-engine-typing-indicator
* @requires {@link ChatEngine}
*/

/**
* @function
* @param {Object} [config] The plugin config object
* @param {Integer} [config.timeout] Fires the "stopTyping" event if have not typed within this setting. Milliseconds.
*/
module.exports = (config = {}) => {

    // set the default for typing
    // if the client types input, we wont fire "stopTyping" unless the client
    // doesn't type anything for this timeout
    config.timeout = config.timeout || 1000;

    // create a place to store the setTimeout in
    let stopTypingTimeout = null;

    // define the methods that will be attached to the class Chat
    class extension  {
        construct() {

            // will set Chat.typing.isTyping to false immediately
            this.isTyping = false;

        }

        /**
        @method typingindicator"."startTyping
        @ceextends Chat
        */
        startTyping() {

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            /**
            @event $typingIndicator.startTyping
            @ceextends Chat
            */
            // emit an event over the network that this user started typing
            //
            /**
            broadcast a stoptyping event
            @event $typingIndiciator"."startTyping
            @ceextends Chat
            */
            this.parent.emit(['$' + 'typingIndicator', 'startTyping'].join('.'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC42XCIsXG4gIFwibWFpblwiOiBcInNyYy9wbHVnaW4uanNcIixcbiAgXCJvcGVuLWNoYXQtZnJhbWV3b3JrXCI6IHtcbiAgICBcIm5hbWVzcGFjZVwiOiBcInR5cGluZy1pbmRpY2F0b3JcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJjaGF0LWVuZ2luZVwiOiBcIl4wLjUuMlwiXG4gIH1cbn1cbiIsIi8qKlxuKiBAbW9kdWxlIGNoYXQtZW5naW5lLXR5cGluZy1pbmRpY2F0b3JcbiogQHJlcXVpcmVzIHtAbGluayBDaGF0RW5naW5lfVxuKi9cblxuLyoqXG4qIEBmdW5jdGlvblxuKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIHBsdWdpbiBjb25maWcgb2JqZWN0XG4qIEBwYXJhbSB7SW50ZWdlcn0gW2NvbmZpZy50aW1lb3V0XSBGaXJlcyB0aGUgXCJzdG9wVHlwaW5nXCIgZXZlbnQgaWYgaGF2ZSBub3QgdHlwZWQgd2l0aGluIHRoaXMgc2V0dGluZy4gTWlsbGlzZWNvbmRzLlxuKi9cbm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZyA9IHt9KSA9PiB7XG5cbiAgICAvLyBzZXQgdGhlIGRlZmF1bHQgZm9yIHR5cGluZ1xuICAgIC8vIGlmIHRoZSBjbGllbnQgdHlwZXMgaW5wdXQsIHdlIHdvbnQgZmlyZSBcInN0b3BUeXBpbmdcIiB1bmxlc3MgdGhlIGNsaWVudFxuICAgIC8vIGRvZXNuJ3QgdHlwZSBhbnl0aGluZyBmb3IgdGhpcyB0aW1lb3V0XG4gICAgY29uZmlnLnRpbWVvdXQgPSBjb25maWcudGltZW91dCB8fCAxMDAwO1xuXG4gICAgLy8gY3JlYXRlIGEgcGxhY2UgdG8gc3RvcmUgdGhlIHNldFRpbWVvdXQgaW5cbiAgICBsZXQgc3RvcFR5cGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gICAgLy8gZGVmaW5lIHRoZSBtZXRob2RzIHRoYXQgd2lsbCBiZSBhdHRhY2hlZCB0byB0aGUgY2xhc3MgQ2hhdFxuICAgIGNsYXNzIGV4dGVuc2lvbiAge1xuICAgICAgICBjb25zdHJ1Y3QoKSB7XG5cbiAgICAgICAgICAgIC8vIHdpbGwgc2V0IENoYXQudHlwaW5nLmlzVHlwaW5nIHRvIGZhbHNlIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICBAbWV0aG9kIHR5cGluZ2luZGljYXRvclwiLlwic3RhcnRUeXBpbmdcbiAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIHN0YXJ0VHlwaW5nKCkge1xuXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGNhbGxlZCBtYW51YWxseSBieSB0aGUgY2xpZW50XG5cbiAgICAgICAgICAgIC8vIHNldCBib29sZWFuIHRoYXQgd2UncmUgaW4gbWlkZGxlIG9mIHR5cGluZ1xuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgQGV2ZW50ICR0eXBpbmdJbmRpY2F0b3Iuc3RhcnRUeXBpbmdcbiAgICAgICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vIGVtaXQgYW4gZXZlbnQgb3ZlciB0aGUgbmV0d29yayB0aGF0IHRoaXMgdXNlciBzdGFydGVkIHR5cGluZ1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgYnJvYWRjYXN0IGEgc3RvcHR5cGluZyBldmVudFxuICAgICAgICAgICAgQGV2ZW50ICR0eXBpbmdJbmRpY2lhdG9yXCIuXCJzdGFydFR5cGluZ1xuICAgICAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdGFydFR5cGluZyddLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgICAgIC8vIGtpbGwgYW55IGV4aXN0aW5nIHRpbWVvdXRzXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgdGltZW91dFxuICAgICAgICAgICAgc3RvcFR5cGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0ICgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHN0b3AgdHlwaW5nIGFmdGVyIGEgc2V0IGFtb3VudCBvZiB0aW1lXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIH0sIGNvbmZpZy50aW1lb3V0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgIEBtZXRob2QgdHlwaW5naW5kaWNhdG9yXCIuXCJzdG9wVHlwaW5nXG4gICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBzdG9wVHlwaW5nKCkge1xuXG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGJlIGN1cnJlbnRseSB0eXBpbmcgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaXNUeXBpbmcpIHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdGltZW91dFxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBicm9hZGNhc3QgYSBzdG9wdHlwaW5nIGV2ZW50XG4gICAgICAgICAgICAgICAgQGV2ZW50ICR0eXBpbmdJbmRpY2lhdG9yXCIuXCJzdG9wVHlwaW5nXG4gICAgICAgICAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0b3BUeXBpbmcnXS5qb2luKCcuJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcCB0eXBpbmcgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSBlbWl0IG1pZGRsZXdhcmVcbiAgICBsZXQgZW1pdCA9IHtcbiAgICAgICAgbWVzc2FnZTogKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICAgICAgLy8gaXQncyB3b3J0aCBub3RpbmcgaGVyZSwgd2UgY2FuJ3QgYWNjZXNzIGBgYGV4dGVuc2lvbmBgYCBoZXJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gcnVucyBpbiBhIGRpZmZlcmVudCBjb250ZXh0XG5cbiAgICAgICAgICAgIC8vIG9uIGV2ZXJ5IG1lc3NhZ2UsIHRlbGwgdGhlIGNoYXQgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZygpO1xuXG4gICAgICAgICAgICAvLyBjb250aW51ZSBvblxuICAgICAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgYm90aCB0aGUgZXh0ZW5kZWQgbWV0aG9kcyBhbmQgdGhlIG1pZGRsZXdhcmUgaW4gb3VyIHBsdWdpblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ3R5cGluZ0luZGljYXRvcicsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9LFxuICAgICAgICBtaWRkbGV3YXJlOiB7XG4gICAgICAgICAgICBlbWl0XG4gICAgICAgIH1cbiAgICB9XG5cblxufTtcbiJdfQ==
