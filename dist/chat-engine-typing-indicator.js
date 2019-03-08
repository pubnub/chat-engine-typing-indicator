(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-typing-indicator",
  "version": "0.0.10",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.21"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwicGFja2FnZS5qc29uIiwic3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImF1dGhvclwiOiBcIklhbiBKZW5uaW5nc1wiLFxuICBcIm5hbWVcIjogXCJjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xMFwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuOS4yMVwiXG4gIH1cbn1cbiIsIi8qKlxuKiBFbWl0cyB0aGUgYGBgJHR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZ2BgYCBhbmQgYGAkdHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmdgYGAgZXZlbiBvbiBhIHtAbGluayBDaGF0fSB3aGVuIGEgdXNlciBpcyBtYXJrZWQgYXMgdHlwaW5nIG9yIG5vdCB0eXBpbmcuXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtdHlwaW5nLWluZGljYXRvclxuKiBAcmVxdWlyZXMge0BsaW5rIENoYXRFbmdpbmV9XG4qL1xuXG4vKipcbkBmdW5jdGlvblxuQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBwbHVnaW4gY29uZmlnIG9iamVjdFxuQHBhcmFtIHtJbnRlZ2VyfSBbY29uZmlnLnRpbWVvdXRdIEZpcmVzIHRoZSBcInN0b3BUeXBpbmdcIiBldmVudCBpZiBoYXZlIG5vdCB0eXBlZCB3aXRoaW4gdGhpcyBzZXR0aW5nLiBNaWxsaXNlY29uZHMuXG5AZXhhbXBsZVxuXG4vL3Byb3ZpZGluZyBhIGNvbmZpZyBpcyBvcHRpb25hbCwgdGhlIGRlZmF1bHQgdGltZW91dCBpcyAxMDAwbXNcbmxldCBjb25maWcgPSB7IHRpbWVvdXQ6IDEwMDAgfVxuY2hhdC5wbHVnaW4oQ2hhdEVuZ2luZUNvcmUucGx1Z2luWydjaGF0LWVuZ2luZS10eXBpbmctaW5kaWNhdG9yJ10oY29uZmlnKSk7XG5cbi8vIGVtaXQgdGhlIHR5cGluZyBldmVudFxuY2hhdC50eXBpbmdJbmRpY2F0b3Iuc3RhcnRUeXBpbmcoKTtcblxuLy8gbWFudWFsbHkgZW1pdCB0aGUgc3RvcCB0eWluZyBldmVudFxuLy8gdGhpcyBpcyBhdXRvbWFnaWNhbGx5IGVtaXR0ZWQgYWZ0ZXIgdGhlIHRpbWVvdXQgcGVyaW9kLCBvciB3aGVuIGEgbWVzc2FnZSBpcyBzZW50XG5jaGF0LnR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nKCk7XG5cbi8vIHR5cGluZyBib29sZWFuXG5jaGF0LmlzVHlwaW5nO1xuLy8gRmFsc2VcblxuY2hhdC5vbignJHR5cGluZ0luZGljYXRvci5zdGFydFR5cGluZycsIChwYXlsb2FkKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZC51c2VyLCBcImlzIHR5cGluZy4uLlwiKTtcbn0pO1xuXG5jaGF0Lm9uKCckdHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcnLCAocGF5bG9hZCkgPT4ge1xuICAgICAgICAocGF5bG9hZC51c2VyLCBcImlzIG5vdCB0eXBpbmcuXCIpO1xufSk7XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjb25maWcgPSB7fSkgPT4ge1xuXG4gICAgLy8gc2V0IHRoZSBkZWZhdWx0IGZvciB0eXBpbmdcbiAgICAvLyBpZiB0aGUgY2xpZW50IHR5cGVzIGlucHV0LCB3ZSB3b250IGZpcmUgXCJzdG9wVHlwaW5nXCIgdW5sZXNzIHRoZSBjbGllbnRcbiAgICAvLyBkb2Vzbid0IHR5cGUgYW55dGhpbmcgZm9yIHRoaXMgdGltZW91dFxuICAgIGNvbmZpZy50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQgfHwgMTAwMDtcblxuICAgIC8vIGNyZWF0ZSBhIHBsYWNlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGluXG4gICAgbGV0IHN0b3BUeXBpbmdUaW1lb3V0ID0gbnVsbDtcblxuICAgIC8vIGRlZmluZSB0aGUgbWV0aG9kcyB0aGF0IHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhlIGNsYXNzIENoYXRcbiAgICBjbGFzcyBleHRlbnNpb24gIHtcbiAgICAgICAgY29uc3RydWN0KCkge1xuXG4gICAgICAgICAgICAvLyB3aWxsIHNldCBDaGF0LnR5cGluZ0luZGljYXRvci5pc1R5cGluZyB0byBmYWxzZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgZW1pdCBhbiBldmVudCBvdmVyIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyB1c2VyIHN0YXJ0ZWQgdHlwaW5nXG4gICAgICAgIEBtZXRob2QgdHlwaW5naW5kaWNhdG9yXCIuXCJzdGFydFR5cGluZ1xuICAgICAgICBAY2VleHRlbmRzIENoYXRcbiAgICAgICAgKi9cbiAgICAgICAgc3RhcnRUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLmlzVHlwaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChbJyQnICsgJ3R5cGluZ0luZGljYXRvcicsICdzdGFydFR5cGluZyddLmpvaW4oJy4nKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyB0aGlzIGlzIGNhbGxlZCBtYW51YWxseSBieSB0aGUgY2xpZW50XG5cbiAgICAgICAgICAgIC8vIHNldCBib29sZWFuIHRoYXQgd2UncmUgaW4gbWlkZGxlIG9mIHR5cGluZ1xuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGtpbGwgYW55IGV4aXN0aW5nIHRpbWVvdXRzXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgdGltZW91dFxuICAgICAgICAgICAgc3RvcFR5cGluZ1RpbWVvdXQgPSBzZXRUaW1lb3V0ICgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmlnZ2VyIHN0b3AgdHlwaW5nIGFmdGVyIGEgc2V0IGFtb3VudCBvZiB0aW1lXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIH0sIGNvbmZpZy50aW1lb3V0KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgIEBtZXRob2QgdHlwaW5naW5kaWNhdG9yXCIuXCJzdG9wVHlwaW5nXG4gICAgICAgIEBjZWV4dGVuZHMgQ2hhdFxuICAgICAgICAqL1xuICAgICAgICBzdG9wVHlwaW5nKCkge1xuXG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGJlIGN1cnJlbnRseSB0eXBpbmcgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaXNUeXBpbmcpIHtcblxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdGltZW91dFxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdG9wVHlwaW5nVGltZW91dCk7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICBicm9hZGNhc3QgYSBzdG9wdHlwaW5nIGV2ZW50XG4gICAgICAgICAgICAgICAgQGV2ZW50ICR0eXBpbmdJbmRpY2lhdG9yXCIuXCJzdG9wVHlwaW5nXG4gICAgICAgICAgICAgICAgQGNlZXh0ZW5kcyBDaGF0XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5lbWl0KFsnJCcgKyAndHlwaW5nSW5kaWNhdG9yJywgJ3N0b3BUeXBpbmcnXS5qb2luKCcuJykpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcCB0eXBpbmcgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmluZSBlbWl0IG1pZGRsZXdhcmVcbiAgICBsZXQgZW1pdCA9IHtcbiAgICAgICAgbWVzc2FnZTogKHBheWxvYWQsIG5leHQpID0+IHtcblxuICAgICAgICAgICAgLy8gaXQncyB3b3J0aCBub3RpbmcgaGVyZSwgd2UgY2FuJ3QgYWNjZXNzIGBgYGV4dGVuc2lvbmBgYCBoZXJlXG4gICAgICAgICAgICAvLyBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gcnVucyBpbiBhIGRpZmZlcmVudCBjb250ZXh0XG5cbiAgICAgICAgICAgIC8vIG9uIGV2ZXJ5IG1lc3NhZ2UsIHRlbGwgdGhlIGNoYXQgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIHBheWxvYWQuY2hhdC50eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZygpO1xuXG4gICAgICAgICAgICAvLyBjb250aW51ZSBvblxuICAgICAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBkZWZpbmUgYm90aCB0aGUgZXh0ZW5kZWQgbWV0aG9kcyBhbmQgdGhlIG1pZGRsZXdhcmUgaW4gb3VyIHBsdWdpblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWVzcGFjZTogJ3R5cGluZ0luZGljYXRvcicsXG4gICAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgICAgIENoYXQ6IGV4dGVuc2lvblxuICAgICAgICB9LFxuICAgICAgICBtaWRkbGV3YXJlOiB7XG4gICAgICAgICAgICBlbWl0XG4gICAgICAgIH1cbiAgICB9XG5cblxufTtcbiJdfQ==
