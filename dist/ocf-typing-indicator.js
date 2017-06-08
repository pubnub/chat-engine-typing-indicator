(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "ocf-typing-indicator",
  "version": "0.0.3",
  "main": "src/plugin.js",
  "open-chat-framework": {
    "namespace": "typing-indicator"
  },
  "dependencies": {
    "ocf": "^0.0.4"
  }
}

},{}],3:[function(require,module,exports){
module.exports = (config) => {

    // set the default for typing
    // if the client types input, we wont fire "stopTyping" unless the client
    // doesn't type anything for this timeout
    config = config || {timeout: 1000};

    // create a place to store the setTimeout in
    let stopTypingTimeout = null;

    // define the methods that will be attached to the class Chat
    class extension  {
        construct() {

            // will set Chat.typing.isTyping to false immediately
            this.isTyping = false;

        }
        startTyping() {

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            // emit an event over the network that this user started typing
            this.parent.emit(['$' + 'typingIndicator', 'startTyping'].join('.'));

            // kill any existing timeouts
            clearTimeout(stopTypingTimeout);

            // create a new timeout
            stopTypingTimeout = setTimeout (() => {

                // trigger stop typing after a set amount of time
                this.stopTyping();

            }, config.timeout);

        }
        stopTyping() {

            // we must be currently typing to stop typing
            // if(this.isTyping) {

                // remove the timeout
                clearTimeout(stopTypingTimeout);

                // broadcast a stoptyping event
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
            Chat: extension,
            GlobalChat: extension
        },
        middleware: {
            emit
        }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJvY2YtdHlwaW5nLWluZGljYXRvclwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuM1wiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwib3Blbi1jaGF0LWZyYW1ld29ya1wiOiB7XG4gICAgXCJuYW1lc3BhY2VcIjogXCJ0eXBpbmctaW5kaWNhdG9yXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwib2NmXCI6IFwiXjAuMC40XCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyBzZXQgdGhlIGRlZmF1bHQgZm9yIHR5cGluZ1xuICAgIC8vIGlmIHRoZSBjbGllbnQgdHlwZXMgaW5wdXQsIHdlIHdvbnQgZmlyZSBcInN0b3BUeXBpbmdcIiB1bmxlc3MgdGhlIGNsaWVudFxuICAgIC8vIGRvZXNuJ3QgdHlwZSBhbnl0aGluZyBmb3IgdGhpcyB0aW1lb3V0XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt0aW1lb3V0OiAxMDAwfTtcblxuICAgIC8vIGNyZWF0ZSBhIHBsYWNlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGluXG4gICAgbGV0IHN0b3BUeXBpbmdUaW1lb3V0ID0gbnVsbDtcblxuICAgIC8vIGRlZmluZSB0aGUgbWV0aG9kcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIGNsYXNzIENoYXRcbiAgICBjbGFzcyBleHRlbnNpb24gIHtcbiAgICAgICAgY29uc3RydWN0KCkge1xuXG4gICAgICAgICAgICAvLyB3aWxsIHNldCBDaGF0LnR5cGluZy5pc1R5cGluZyB0byBmYWxzZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH1cbiAgICAgICAgc3RhcnRUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgY2FsbGVkIG1hbnVhbGx5IGJ5IHRoZSBjbGllbnRcblxuICAgICAgICAgICAgLy8gc2V0IGJvb2xlYW4gdGhhdCB3ZSdyZSBpbiBtaWRkbGUgb2YgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gZW1pdCBhbiBldmVudCBvdmVyIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyB1c2VyIHN0YXJ0ZWQgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0YXJ0VHlwaW5nJ10uam9pbignLicpKTtcblxuICAgICAgICAgICAgLy8ga2lsbCBhbnkgZXhpc3RpbmcgdGltZW91dHNcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyB0aW1lb3V0XG4gICAgICAgICAgICBzdG9wVHlwaW5nVGltZW91dCA9IHNldFRpbWVvdXQgKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgc3RvcCB0eXBpbmcgYWZ0ZXIgYSBzZXQgYW1vdW50IG9mIHRpbWVcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgfSwgY29uZmlnLnRpbWVvdXQpO1xuXG4gICAgICAgIH1cbiAgICAgICAgc3RvcFR5cGluZygpIHtcblxuICAgICAgICAgICAgLy8gd2UgbXVzdCBiZSBjdXJyZW50bHkgdHlwaW5nIHRvIHN0b3AgdHlwaW5nXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlzVHlwaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIHRpbWVvdXRcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYnJvYWRjYXN0IGEgc3RvcHR5cGluZyBldmVudFxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmVtaXQoWyckJyArICd0eXBpbmdJbmRpY2F0b3InLCAnc3RvcFR5cGluZyddLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzdG9wIHR5cGluZyBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGVtaXQgbWlkZGxld2FyZVxuICAgIGxldCBlbWl0ID0ge1xuICAgICAgICBtZXNzYWdlOiAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBpdCdzIHdvcnRoIG5vdGluZyBoZXJlLCB3ZSBjYW4ndCBhY2Nlc3MgYGBgZXh0ZW5zaW9uYGBgIGhlcmVcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiBydW5zIGluIGEgZGlmZmVyZW50IGNvbnRleHRcblxuICAgICAgICAgICAgLy8gb24gZXZlcnkgbWVzc2FnZSwgdGVsbCB0aGUgY2hhdCB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LnR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIG9uXG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBib3RoIHRoZSBleHRlbmRlZCBtZXRob2RzIGFuZCB0aGUgbWlkZGxld2FyZSBpbiBvdXIgcGx1Z2luXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAndHlwaW5nSW5kaWNhdG9yJyxcbiAgICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uLFxuICAgICAgICAgICAgR2xvYmFsQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgIH0sXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIGVtaXRcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=
