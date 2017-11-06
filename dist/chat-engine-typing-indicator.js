(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.8",
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

            this.lastEmit = new Date().getTime();

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

            if(new Date().getTime() - this.lastEmit > config.timeout) {
                this.parent.emit(['$' + 'typingIndicator', 'startTyping'].join('.'));
                this.lastEmit = new Date().getTime();
            };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4xMS4wL2xpYi9ub2RlX21vZHVsZXMvY2hhdC1lbmdpbmUtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgcGFja2FnZSA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpO1xuICAgIHdpbmRvdy5DaGF0RW5naW5lQ29yZS5wbHVnaW5bcGFja2FnZS5uYW1lXSA9IHJlcXVpcmUoJy4uL3NyYy9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtdHlwaW5nLWluZGljYXRvclwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuOFwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuNS4yXCJcbiAgfVxufVxuIiwiLyoqXG4qIEVtaXRzIHRoZSBgYGAkdHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nYGBgIGFuZCBgYCR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZ2BgYCBldmVuIG9uIGEge0BsaW5rIENoYXR9IHdoZW4gYSB1c2VyIGlzIG1hcmtlZCBhcyB0eXBpbmcgb3Igbm90IHR5cGluZy5cbiogQG1vZHVsZSBjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yXG4qIEByZXF1aXJlcyB7QGxpbmsgQ2hhdEVuZ2luZX1cbiovXG5cbi8qKlxuQGZ1bmN0aW9uXG5AcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIHBsdWdpbiBjb25maWcgb2JqZWN0XG5AcGFyYW0ge0ludGVnZXJ9IFtjb25maWcudGltZW91dF0gRmlyZXMgdGhlIFwic3RvcFR5cGluZ1wiIGV2ZW50IGlmIGhhdmUgbm90IHR5cGVkIHdpdGhpbiB0aGlzIHNldHRpbmcuIE1pbGxpc2Vjb25kcy5cbkBleGFtcGxlXG5cbi8vcHJvdmlkaW5nIGEgY29uZmlnIGlzIG9wdGlvbmFsLCB0aGUgZGVmYXVsdCB0aW1lb3V0IGlzIDEwMDBtc1xubGV0IGNvbmZpZyA9IHsgdGltZW91dDogMTAwMCB9XG5jaGF0LnBsdWdpbihDaGF0RW5naW5lQ29yZS5wbHVnaW5bJ2NoYXQtZW5naW5lLXR5cGluZy1pbmRpY2F0b3InXShjb25maWcpKTtcblxuLy8gZW1pdCB0aGUgdHlwaW5nIGV2ZW50XG5jaGF0LnR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZygpO1xuXG4vLyBtYW51YWxseSBlbWl0IHRoZSBzdG9wIHR5aW5nIGV2ZW50XG4vLyB0aGlzIGlzIGF1dG9tYWdpY2FsbHkgZW1pdHRlZCBhZnRlciB0aGUgdGltZW91dCBwZXJpb2QsIG9yIHdoZW4gYSBtZXNzYWdlIGlzIHNlbnRcbmNoYXQudHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcoKTtcblxuLy8gdHlwaW5nIGJvb2xlYW5cbmNoYXQuaXNUeXBpbmc7XG4vLyBGYWxzZVxuXG5jaGF0Lm9uKCckdHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nJywgKHBheWxvYWQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhwYXlsb2FkLnVzZXIsIFwiaXMgdHlwaW5nLi4uXCIpO1xufSk7XG5cbmNoYXQub24oJyR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZycsIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZC51c2VyLCBcImlzIG5vdCB0eXBpbmcuXCIpO1xufSk7XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcpID0+IHtcblxuICAgIC8vIHNldCB0aGUgZGVmYXVsdCBmb3IgdHlwaW5nXG4gICAgLy8gaWYgdGhlIGNsaWVudCB0eXBlcyBpbnB1dCwgd2Ugd29udCBmaXJlIFwic3RvcFR5cGluZ1wiIHVubGVzcyB0aGUgY2xpZW50XG4gICAgLy8gZG9lc24ndCB0eXBlIGFueXRoaW5nIGZvciB0aGlzIHRpbWVvdXRcbiAgICBjb25maWcudGltZW91dCA9IGNvbmZpZy50aW1lb3V0IHx8IDEwMDA7XG5cbiAgICAvLyBjcmVhdGUgYSBwbGFjZSB0byBzdG9yZSB0aGUgc2V0VGltZW91dCBpblxuICAgIGxldCBzdG9wVHlwaW5nVGltZW91dCA9IG51bGw7XG5cbiAgICAvLyBkZWZpbmUgdGhlIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBDaGF0XG4gICAgY2xhc3MgZXh0ZW5zaW9uICB7XG4gICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgLy8gd2lsbCBzZXQgQ2hhdC50eXBpbmdJbmRpY2F0b3IuaXNUeXBpbmcgdG8gZmFsc2UgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5sYXN0RW1pdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgQG1ldGhvZCB0eXBpbmdpbmRpY2F0b3JcIi5cInN0YXJ0VHlwaW5nXG4gICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBzdGFydFR5cGluZygpIHtcblxuICAgICAgICAgICAgLy8gdGhpcyBpcyBjYWxsZWQgbWFudWFsbHkgYnkgdGhlIGNsaWVudFxuXG4gICAgICAgICAgICAvLyBzZXQgYm9vbGVhbiB0aGF0IHdlJ3JlIGluIG1pZGRsZSBvZiB0eXBpbmdcbiAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgIEBldmVudCAkdHlwaW5nSW5kaWNhdG9yLnN0YXJ0VHlwaW5nXG4gICAgICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICAvLyBlbWl0IGFuIGV2ZW50IG92ZXIgdGhlIG5ldHdvcmsgdGhhdCB0aGlzIHVzZXIgc3RhcnRlZCB0eXBpbmdcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgIGJyb2FkY2FzdCBhIHN0b3B0eXBpbmcgZXZlbnRcbiAgICAgICAgICAgIEBldmVudCAkdHlwaW5nSW5kaWNpYXRvclwiLlwic3RhcnRUeXBpbmdcbiAgICAgICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgaWYobmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLmxhc3RFbWl0ID4gY29uZmlnLnRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0YXJ0VHlwaW5nJ10uam9pbignLicpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RFbWl0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBraWxsIGFueSBleGlzdGluZyB0aW1lb3V0c1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHRpbWVvdXRcbiAgICAgICAgICAgIHN0b3BUeXBpbmdUaW1lb3V0ID0gc2V0VGltZW91dCAoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBzdG9wIHR5cGluZyBhZnRlciBhIHNldCBhbW91bnQgb2YgdGltZVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFR5cGluZygpO1xuXG4gICAgICAgICAgICB9LCBjb25maWcudGltZW91dCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICBAbWV0aG9kIHR5cGluZ2luZGljYXRvclwiLlwic3RvcFR5cGluZ1xuICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgKi9cbiAgICAgICAgc3RvcFR5cGluZygpIHtcblxuICAgICAgICAgICAgLy8gd2UgbXVzdCBiZSBjdXJyZW50bHkgdHlwaW5nIHRvIHN0b3AgdHlwaW5nXG4gICAgICAgICAgICAvLyBpZih0aGlzLmlzVHlwaW5nKSB7XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIHRpbWVvdXRcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgYnJvYWRjYXN0IGEgc3RvcHR5cGluZyBldmVudFxuICAgICAgICAgICAgICAgIEBldmVudCAkdHlwaW5nSW5kaWNpYXRvclwiLlwic3RvcFR5cGluZ1xuICAgICAgICAgICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdG9wVHlwaW5nJ10uam9pbignLicpKTtcblxuICAgICAgICAgICAgICAgIC8vIHN0b3AgdHlwaW5nIGluZGljYXRvclxuICAgICAgICAgICAgICAgIHRoaXMuaXNUeXBpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWZpbmUgZW1pdCBtaWRkbGV3YXJlXG4gICAgbGV0IGVtaXQgPSB7XG4gICAgICAgIG1lc3NhZ2U6IChwYXlsb2FkLCBuZXh0KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGl0J3Mgd29ydGggbm90aW5nIGhlcmUsIHdlIGNhbid0IGFjY2VzcyBgYGBleHRlbnNpb25gYGAgaGVyZVxuICAgICAgICAgICAgLy8gYmVjYXVzZSB0aGlzIGZ1bmN0aW9uIHJ1bnMgaW4gYSBkaWZmZXJlbnQgY29udGV4dFxuXG4gICAgICAgICAgICAvLyBvbiBldmVyeSBtZXNzYWdlLCB0ZWxsIHRoZSBjaGF0IHRvIHN0b3AgdHlwaW5nXG4gICAgICAgICAgICBwYXlsb2FkLmNoYXQudHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcoKTtcblxuICAgICAgICAgICAgLy8gY29udGludWUgb25cbiAgICAgICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZGVmaW5lIGJvdGggdGhlIGV4dGVuZGVkIG1ldGhvZHMgYW5kIHRoZSBtaWRkbGV3YXJlIGluIG91ciBwbHVnaW5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lc3BhY2U6ICd0eXBpbmdJbmRpY2F0b3InLFxuICAgICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgICBDaGF0OiBleHRlbnNpb25cbiAgICAgICAgfSxcbiAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgZW1pdFxuICAgICAgICB9XG4gICAgfVxuXG5cbn07XG4iXX0=
