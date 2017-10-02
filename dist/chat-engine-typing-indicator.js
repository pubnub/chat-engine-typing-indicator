(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.7",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.5.2"
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
    console.log(payload.user, "is not typing.");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtdHlwaW5nLWluZGljYXRvclwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuN1wiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuNS4yXCJcbiAgfVxufVxuIiwiLyoqXG4qIEVtaXRzIHRoZSBgYGAkdHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nYGBgIGFuZCBgYCR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZ2BgYCBldmVuIG9uIGEge0BsaW5rIENoYXR9IHdoZW4gYSB1c2VyIGlzIG1hcmtlZCBhcyB0eXBpbmcgb3Igbm90IHR5cGluZy5cbiogQG1vZHVsZSBjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yXG4qIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiovXG5cbi8qKlxuQGZ1bmN0aW9uXG5AcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIHBsdWdpbiBjb25maWcgb2JqZWN0XG5AcGFyYW0ge0ludGVnZXJ9IFtjb25maWcudGltZW91dF0gRmlyZXMgdGhlIFwic3RvcFR5cGluZ1wiIGV2ZW50IGlmIGhhdmUgbm90IHR5cGVkIHdpdGhpbiB0aGlzIHNldHRpbmcuIE1pbGxpc2Vjb25kcy5cbkBleGFtcGxlXG5cbi8vcHJvdmlkaW5nIGEgY29uZmlnIGlzIG9wdGlvbmFsLCB0aGUgZGVmYXVsdCB0aW1lb3V0IGlzIDEwMDBtc1xubGV0IGNvbmZpZyA9IHsgdGltZW91dDogMTAwMCB9XG5jaGF0LnBsdWdpbihDaGF0RW5naW5lQ29yZS5wbHVnaW5bJ2NoYXQtZW5naW5lLXR5cGluZy1pbmRpY2F0b3InXShjb25maWcpKTtcblxuLy8gZW1pdCB0aGUgdHlwaW5nIGV2ZW50XG5jaGF0LnR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZygpO1xuXG4vLyBtYW51YWxseSBlbWl0IHRoZSBzdG9wIHR5aW5nIGV2ZW50XG4vLyB0aGlzIGlzIGF1dG9tYWdpY2FsbHkgZW1pdHRlZCBhZnRlciB0aGUgdGltZW91dCBwZXJpb2QsIG9yIHdoZW4gYSBtZXNzYWdlIGlzIHNlbnRcbmNoYXQudHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcoKTtcblxuLy8gdHlwaW5nIGJvb2xlYW5cbmNoYXQuaXNUeXBpbmc7XG4vLyBGYWxzZVxuXG5jaGF0Lm9uKCckdHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nJywgKHBheWxvYWQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkLnVzZXIsIFwiaXMgdHlwaW5nLi4uXCIpO1xufSk7XG5cbmNoYXQub24oJyR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZycsIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZC51c2VyLCBcImlzIG5vdCB0eXBpbmcuXCIpO1xufSk7XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcpID0+IHtcblxuICAgIC8vIHNldCB0aGUgZGVmYXVsdCBmb3IgdHlwaW5nXG4gICAgLy8gaWYgdGhlIGNsaWVudCB0eXBlcyBpbnB1dCwgd2Ugd29udCBmaXJlIFwic3RvcFR5cGluZ1wiIHVubGVzcyB0aGUgY2xpZW50XG4gICAgLy8gZG9lc24ndCB0eXBlIGFueXRoaW5nIGZvciB0aGlzIHRpbWVvdXRcbiAgICBjb25maWcudGltZW91dCA9IGNvbmZpZy50aW1lb3V0IHx8IDEwMDA7XG5cbiAgICAvLyBjcmVhdGUgYSBwbGFjZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBpblxuICAgIGxldCBzdG9wVHlwaW5nVGltZW91dCA9IG51bGw7XG5cbiAgICAvLyBkZWZpbmUgdGhlIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBDaGF0XG4gICAgY2xhc3MgZXh0ZW5zaW9uICB7XG4gICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgLy8gd2lsbCBzZXQgQ2hhdC50eXBpbmdJbmRpY2F0b3IuaXNUeXBpbmcgdG8gZmFsc2UgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgIEBtZXRob2QgdHlwaW5naW5kaWNhdG9yXCIuXCJzdGFydFR5cGluZ1xuICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgKi9cbiAgICAgICAgc3RhcnRUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgY2FsbGVkIG1hbnVhbGx5IGJ5IHRoZSBjbGllbnRcblxuICAgICAgICAgICAgLy8gc2V0IGJvb2xlYW4gdGhhdCB3ZSdyZSBpbiBtaWRkbGUgb2YgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBAZXZlbnQgJHR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZ1xuICAgICAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgLy8gZW1pdCBhbiBldmVudCBvdmVyIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyB1c2VyIHN0YXJ0ZWQgdHlwaW5nXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICBicm9hZGNhc3QgYSBzdG9wdHlwaW5nIGV2ZW50XG4gICAgICAgICAgICBAZXZlbnQgJHR5cGluZ0luZGljaWF0b3JcIi5cInN0YXJ0VHlwaW5nXG4gICAgICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0YXJ0VHlwaW5nJ10uam9pbignLicpKTtcblxuICAgICAgICAgICAgLy8ga2lsbCBhbnkgZXhpc3RpbmcgdGltZW91dHNcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyB0aW1lb3V0XG4gICAgICAgICAgICBzdG9wVHlwaW5nVGltZW91dCA9IHNldFRpbWVvdXQgKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHRyaWdnZXIgc3RvcCB0eXBpbmcgYWZ0ZXIgYSBzZXQgYW1vdW50IG9mIHRpbWVcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgfSwgY29uZmlnLnRpbWVvdXQpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgQG1ldGhvZCB0eXBpbmdpbmRpY2F0b3JcIi5cInN0b3BUeXBpbmdcbiAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICovXG4gICAgICAgIHN0b3BUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHdlIG11c3QgYmUgY3VycmVudGx5IHR5cGluZyB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgLy8gaWYodGhpcy5pc1R5cGluZykge1xuXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0aW1lb3V0XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgIGJyb2FkY2FzdCBhIHN0b3B0eXBpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICBAZXZlbnQgJHR5cGluZ0luZGljaWF0b3JcIi5cInN0b3BUeXBpbmdcbiAgICAgICAgICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmVtaXQoWyckJyArICd0eXBpbmdJbmRpY2F0b3InLCAnc3RvcFR5cGluZyddLmpvaW4oJy4nKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBzdG9wIHR5cGluZyBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIGVtaXQgbWlkZGxld2FyZVxuICAgIGxldCBlbWl0ID0ge1xuICAgICAgICBtZXNzYWdlOiAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBpdCdzIHdvcnRoIG5vdGluZyBoZXJlLCB3ZSBjYW4ndCBhY2Nlc3MgYGBgZXh0ZW5zaW9uYGBgIGhlcmVcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiBydW5zIGluIGEgZGlmZmVyZW50IGNvbnRleHRcblxuICAgICAgICAgICAgLy8gb24gZXZlcnkgbWVzc2FnZSwgdGVsbCB0aGUgY2hhdCB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LnR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIG9uXG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBib3RoIHRoZSBleHRlbmRlZCBtZXRob2RzIGFuZCB0aGUgbWlkZGxld2FyZSBpbiBvdXIgcGx1Z2luXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZXNwYWNlOiAndHlwaW5nSW5kaWNhdG9yJyxcbiAgICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgIH0sXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIGVtaXRcbiAgICAgICAgfVxuICAgIH1cblxuXG59O1xuIl19
