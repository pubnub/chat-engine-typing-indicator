# Typing Indicator Plugin for Chat Engine

Adds the ability to show a typing indicator on a ChatEngine Chat

### Quick Start

0. Have a ChatEngine server running already, instantiate a client and connect it
```js
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here'
});

ChatEngine.connect('Username');
ChatEngine.on('$ready', () = { ... });
```

1. Attach this plugin to the channel you want, in this case global
```js
ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator']());
```

2. The plugin needs to be notified when the user is considered typing or not typing
```js
// emits the $typingIndicator.startTyping event
ChatEngine.global.typingIndicator.startTyping();
```
```js
// emits the $typingIndicator.stopTyping even - default state
ChatEngine.global.typingIndicator.stopTyping();
```

3. Listen for the events
```js
ChatEngine.global.on('$typingIndicator.startTyping', (payload) => {
    console.log(payload.user + "is typing...");
});
```
```js
ChatEngine.global.on('$typingIndicator.stopTyping', (payload) => {
    console.log(payload.user + "is not typing.");
});
```

