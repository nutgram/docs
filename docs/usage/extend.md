# Extend

Nutgram provides to you a way to extend the framework.

The `Nutgram` class and all its types (`BaseType` class) have the ability that makes 
it possible to add methods at runtime.

### Usage
You can add a new method using `macro`:

```php
Nugram::macro('sendHelloMessage', function(){
    return $this->sendMessage('Hello!');
});

Message::macro('pin', function($opt = []){
    return $this->bot->pinChatMessage($this->chat->id, $this->message_id, $opt);
});

$bot = new Nutgram('you telegram token here');
$message = $bot->sendHelloMessage(); // return a Message object
$message->pin(); // pin the message
```

You can also add multiple methods in one go by using a `mixin` class. 
A mixin class contains methods that return callables. 
Each method from the mixin will be registered on the class.

```php
$mixin = new class() {
    public function mixinMethod()
    {
       return function() {
          return 'mixinMethod';
       };
    }
    
    public function anotherMixinMethod()
    {
       return function() {
          return 'anotherMixinMethod';
       };
    }
};

Nugram::mixin($mixin);
$macroableClass->mixinMethod() // returns 'mixinMethod';
$macroableClass->anotherMixinMethod() // returns 'anotherMixinMethod';
```