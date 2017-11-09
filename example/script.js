// In this example we are going to create a chat client
// That will let you know when you are typing
// (useful, I know)
const YOUR_PUBLISH_KEY = '';
const YOUR_SUBSCRIBE_KEY = '';

// just making sure you're paying attention
if (YOUR_PUBLISH_KEY === '' || YOUR_SUBSCRIBE_KEY === '') {
    alert('You forgot to enter your keys');
}

//    ________          __  ______            _          
//   / ____/ /_  ____ _/ /_/ ____/___  ____ _(_)___  ___ 
//  / /   / __ \/ __ `/ __/ __/ / __ \/ __ `/ / __ \/ _ \
// / /___/ / / / /_/ / /_/ /___/ / / / /_/ / / / / /  __/
// \____/_/ /_/\__,_/\__/_____/_/ /_/\__, /_/_/ /_/\___/ 
//                                  /____/               

// get some references to functions
let send = function () {};
let keypress = function () {};

// create an optional config object to increase the default timeout from 1000ms
let config = { timeout: 2000 };

// create an instance of chat-engine
const ChatEngine = ChatEngineCore.create({
    publishKey: YOUR_SUBSCRIBE_KEY,
    subscribeKey: YOUR_PUBLISH_KEY
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
    // bootstap automagically makes it go away if it's empty
    ChatEngine.global.on('$typingIndicator.startTyping', (payload) => {

        $('#typing').html(payload.sender.uuid + " is typing...");

    });

    ChatEngine.global.on('$typingIndicator.stopTyping', (payload) => {

        $('#typing').empty();

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
