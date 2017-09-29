// In this example we are going to create a chat client
// That will let you know when you are typing
// (useful, I know)

// get some references to functions
let send = function () {};
let keypress = function () {};

// create an optional config object to increase the default timeout from 1000ms
let config = { timeout: 2000 }

// create an instance of chat-engine
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-bcf4e625-d5e0-45de-9f74-f222bf63a4a1',
    subscribeKey: 'sub-c-70f29a7c-8927-11e7-af73-96e8309537a2',
}, {
    endpoint: 'http://localhost:3000/insecure',
    globalChannel: 'typing-indicator-example'
});

// connect kowalski to the network, and when it is successful, do some stuff
ChatEngine.connect('Kowalski');

ChatEngine.on('$.ready', () => {

    // * * * * *  begin plugin specific code  * * * * *

    // attach the typing-indicator plugin to the global channel
    ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator'](config));

    // mark kowalski as typing
    keypress = function (e) {

        if (e.keyCode === 13) {

            send();

        } else {

            ChatEngine.global.typingIndicator.startTyping();

        }

    };

    // when the plugin emits it events, update the UI element accordingly
    // bootstap automagically makes it go away if it's ''
    ChatEngine.global.on('$typingIndicator.startTyping', (payload) => {

        document.getElementById('typing').innerHTML = payload.sender.uuid + " is typing...";

    });

    ChatEngine.global.on('$typingIndicator.stopTyping', (payload) => {

        document.getElementById('typing').innerHTML = '';

    });

    // * * * * *  end plugin specific code  * * * * *

    // use the input box value as message payload and clear it when you hit send
    send = function () {

        ChatEngine.global.emit('message', {
            text: $('#input').val()
        });

        $('#input').val('');

        return false;

    };

    // when any message is emitted on the global channel add it to the chat log
    ChatEngine.global.on('message', (payload) => {

        $('#output').append($('<p><strong>' + payload.sender.uuid + ':</strong> ' + payload.data.text + '</p>'));

    });

});
