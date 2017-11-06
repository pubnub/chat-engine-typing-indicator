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
