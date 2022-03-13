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
    return $this->pinChatMessage($this->chat->id, $this->message_id, $opt);
});

$bot = new Nutgram('you telegram token here');
$message = $bot->sendHelloMessage();
$message->pin();
```

You can also add multiple methods in one go by using a `mixin` class. 
A mixin class contains methods that return callables. 
Each method from the mixin will be registered on the class.

```php
class NutgramCustomMethod{
    public function sendHelloMessage(){
        return function(){
            return $this->sendMessage('Hello!');
        };
    }
    
    public function sendByeMessage(){
        return function(){
            return $this->sendMessage('Bye!');
        };
    }
}

Nugram::mixin(new NutgramCustomMethod());

$bot = new Nutgram('you telegram token here');
$bot->sendHelloMessage();
$bot->sendByeMessage();
```