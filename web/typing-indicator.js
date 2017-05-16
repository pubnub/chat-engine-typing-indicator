(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const namespace = require('../package.json')['open-chat-framework']['namespace'];
    window.OpenChatFramework.plugin[namespace] = require('../plugin.js');

})();

},{"../package.json":2,"../plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-typing-indicator",
  "version": "0.0.1",
  "main": "./plugin.js",
  "open-chat-framework": {
    "namespace": "typing-indicator"
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

            // keep comms on a new channel so we don't flood chat channel
            this.chat = new this.OCF.Chat(this.parent.channel + '.$' + namespace);

            // forward events via broadcast
            this.chat.on('$typingIndicator.startTyping', (event) => {
                this.parent.broadcast('$typingIndicator.startTyping', event);
            });

            this.chat.on('$typingIndicator.stopTyping', (event) => {
                this.parent.broadcast('$typingIndicator.stopTyping', event);
            });

            // will set Chat.typing.isTyping to false immediately
            this.isTyping = false;

        }
        startTyping() {

            // this is called manually by the client

            // set boolean that we're in middle of typing
            this.isTyping = true;

            // send an event over the network that this user started typing
            this.chat.send(['$' + namespace, 'startTyping'].join('.'));

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
                this.chat.send(['$' + namespace, 'stopTyping'].join('.'));      

                // stop typing indicator
                this.isTyping = false;

            // }

        }
    }

    // define send middleware
    let send = {
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
        extends: {
            Chat: extension,
            GlobalChat: extension
        },
        middleware: {
            send
        }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJwbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgbmFtZXNwYWNlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJylbJ29wZW4tY2hhdC1mcmFtZXdvcmsnXVsnbmFtZXNwYWNlJ107XG4gICAgd2luZG93Lk9wZW5DaGF0RnJhbWV3b3JrLnBsdWdpbltuYW1lc3BhY2VdID0gcmVxdWlyZSgnLi4vcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIm9jZi10eXBpbmctaW5kaWNhdG9yXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXG4gIFwibWFpblwiOiBcIi4vcGx1Z2luLmpzXCIsXG4gIFwib3Blbi1jaGF0LWZyYW1ld29ya1wiOiB7XG4gICAgXCJuYW1lc3BhY2VcIjogXCJ0eXBpbmctaW5kaWNhdG9yXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG4gICAgICAgIFxuICAgIC8vIHNldCB0aGUgZGVmYXVsdCBmb3IgdHlwaW5nXG4gICAgLy8gaWYgdGhlIGNsaWVudCB0eXBlcyBpbnB1dCwgd2Ugd29udCBmaXJlIFwic3RvcFR5cGluZ1wiIHVubGVzcyB0aGUgY2xpZW50IFxuICAgIC8vIGRvZXNuJ3QgdHlwZSBhbnl0aGluZyBmb3IgdGhpcyB0aW1lb3V0XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt0aW1lb3V0OiAxMDAwfTtcblxuICAgIC8vIGNyZWF0ZSBhIHBsYWNlIHRvIHN0b3JlIHRoZSBzZXRUaW1lb3V0IGluXG4gICAgbGV0IHN0b3BUeXBpbmdUaW1lb3V0ID0gbnVsbDtcbiAgICBcbiAgICAvLyBkZWZpbmUgdGhlIG1ldGhvZHMgdGhhdCB3aWxsIGJlIGF0dGFjaGVkIHRvIHRoZSBjbGFzcyBDaGF0XG4gICAgY2xhc3MgZXh0ZW5zaW9uICB7XG4gICAgICAgIGNvbnN0cnVjdCgpIHtcblxuICAgICAgICAgICAgLy8ga2VlcCBjb21tcyBvbiBhIG5ldyBjaGFubmVsIHNvIHdlIGRvbid0IGZsb29kIGNoYXQgY2hhbm5lbFxuICAgICAgICAgICAgdGhpcy5jaGF0ID0gbmV3IHRoaXMuT0NGLkNoYXQodGhpcy5wYXJlbnQuY2hhbm5lbCArICcuJCcgKyBuYW1lc3BhY2UpO1xuXG4gICAgICAgICAgICAvLyBmb3J3YXJkIGV2ZW50cyB2aWEgYnJvYWRjYXN0XG4gICAgICAgICAgICB0aGlzLmNoYXQub24oJyR0eXBpbmdJbmRpY2F0b3Iuc3RhcnRUeXBpbmcnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5icm9hZGNhc3QoJyR0eXBpbmdJbmRpY2F0b3Iuc3RhcnRUeXBpbmcnLCBldmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jaGF0Lm9uKCckdHlwaW5nSW5kaWNhdG9yLnN0b3BUeXBpbmcnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5icm9hZGNhc3QoJyR0eXBpbmdJbmRpY2F0b3Iuc3RvcFR5cGluZycsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyB3aWxsIHNldCBDaGF0LnR5cGluZy5pc1R5cGluZyB0byBmYWxzZSBpbW1lZGlhdGVseVxuICAgICAgICAgICAgdGhpcy5pc1R5cGluZyA9IGZhbHNlO1xuXG4gICAgICAgIH1cbiAgICAgICAgc3RhcnRUeXBpbmcoKSB7XG5cbiAgICAgICAgICAgIC8vIHRoaXMgaXMgY2FsbGVkIG1hbnVhbGx5IGJ5IHRoZSBjbGllbnRcblxuICAgICAgICAgICAgLy8gc2V0IGJvb2xlYW4gdGhhdCB3ZSdyZSBpbiBtaWRkbGUgb2YgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gc2VuZCBhbiBldmVudCBvdmVyIHRoZSBuZXR3b3JrIHRoYXQgdGhpcyB1c2VyIHN0YXJ0ZWQgdHlwaW5nXG4gICAgICAgICAgICB0aGlzLmNoYXQuc2VuZChbJyQnICsgbmFtZXNwYWNlLCAnc3RhcnRUeXBpbmcnXS5qb2luKCcuJykpO1xuXG4gICAgICAgICAgICAvLyBraWxsIGFueSBleGlzdGluZyB0aW1lb3V0c1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0b3BUeXBpbmdUaW1lb3V0KTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IHRpbWVvdXRcbiAgICAgICAgICAgIHN0b3BUeXBpbmdUaW1lb3V0ID0gc2V0VGltZW91dCAoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gdHJpZ2dlciBzdG9wIHR5cGluZyBhZnRlciBhIHNldCBhbW91bnQgb2YgdGltZVxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFR5cGluZygpOyAgIFxuXG4gICAgICAgICAgICB9LCBjb25maWcudGltZW91dCk7XG5cbiAgICAgICAgfVxuICAgICAgICBzdG9wVHlwaW5nKCkge1xuXG4gICAgICAgICAgICAvLyB3ZSBtdXN0IGJlIGN1cnJlbnRseSB0eXBpbmcgdG8gc3RvcCB0eXBpbmdcbiAgICAgICAgICAgIC8vIGlmKHRoaXMuaXNUeXBpbmcpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIHRpbWVvdXRcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RvcFR5cGluZ1RpbWVvdXQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGJyb2FkY2FzdCBhIHN0b3B0eXBpbmcgZXZlbnRcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXQuc2VuZChbJyQnICsgbmFtZXNwYWNlLCAnc3RvcFR5cGluZyddLmpvaW4oJy4nKSk7ICAgICAgXG5cbiAgICAgICAgICAgICAgICAvLyBzdG9wIHR5cGluZyBpbmRpY2F0b3JcbiAgICAgICAgICAgICAgICB0aGlzLmlzVHlwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVmaW5lIHNlbmQgbWlkZGxld2FyZVxuICAgIGxldCBzZW5kID0ge1xuICAgICAgICBtZXNzYWdlOiAocGF5bG9hZCwgbmV4dCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBpdCdzIHdvcnRoIG5vdGluZyBoZXJlLCB3ZSBjYW4ndCBhY2Nlc3MgYGBgZXh0ZW5zaW9uYGBgIGhlcmVcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiBydW5zIGluIGEgZGlmZmVyZW50IGNvbnRleHRcblxuICAgICAgICAgICAgLy8gb24gZXZlcnkgbWVzc2FnZSwgdGVsbCB0aGUgY2hhdCB0byBzdG9wIHR5cGluZ1xuICAgICAgICAgICAgcGF5bG9hZC5jaGF0LnR5cGluZ0luZGljYXRvci5zdG9wVHlwaW5nKCk7XG5cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIG9uXG4gICAgICAgICAgICBuZXh0KG51bGwsIHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBib3RoIHRoZSBleHRlbmRlZCBtZXRob2RzIGFuZCB0aGUgbWlkZGxld2FyZSBpbiBvdXIgcGx1Z2luXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uLFxuICAgICAgICAgICAgR2xvYmFsQ2hhdDogZXh0ZW5zaW9uXG4gICAgICAgIH0sXG4gICAgICAgIG1pZGRsZXdhcmU6IHtcbiAgICAgICAgICAgIHNlbmRcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=
