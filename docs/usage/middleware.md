---
sidebar_position: 4
---

# Middleware

In the framework context, any handler is like a **link of chain**, so you can easily link together multiple handlers (
middlewares). It applies the same concept that frameworks like Laravel have, allowing you to leverage them to separate
repeated logic, or perform checks before executing a message handler.

The best explanation comes from the Laravel documentation:

> It's best to envision middleware as a series of "layers" HTTP requests must pass through before they hit your
> application. Each layer can examine the request and even reject it entirely.

Where you can replace the HTTP requests with an incoming update from Telegram.

Let's see an example:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

// global middleware
$bot->middleware(function (Nutgram $bot, $next) {
    $bot->sendMessage('I\'m the global middleware!!');
    $next($bot);
});

$bot->onMessage(function (Nutgram $bot) {
    $bot->sendMessage('I\'m the message handler!!');
})->middleware(function (Nutgram $bot, $next) {

    $bot->sendMessage('I\'m the specific middleware!!');
    $next($bot);
});

$bot->run();
```

In the example above, the sequence of the calls is

```mermaid
graph LR
    global_middleware-->specific_middleware
    specific_middleware-->message_handler
```

As the name says, the `global middleware` will be called before *every* message middleware of every handler (or before
every handler if no middleware specified). The `specific middleware` will be called only before the `message handler`.

The call to `$next($bot)` is needed to proceed through the chain, where `$next` is the next callable, passing the
current instance of the bot. It is possible at any point to stop the execution of the chain, returning from the
function, or not calling the method `$next($bot)`:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

$bot->onMessage(function (Nutgram $bot) {
    $bot->sendMessage('I will be never called :(');
})->middleware(function (Nutgram $bot, $next) {

    $bot->sendMessage('Stop!');
    //$next($bot);
});

$bot->run();
```

## Passing data

It's possible to pass data between middlewares, using the method `set` and `get` on the bot instance, for
example, to automatically retrieve data from a database, perform checks, and so on:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

// retrieve the user
$bot->middleware(function (Nutgram $bot, $next) {
    $user = get_current_user_from_db($bot->userId());
    $bot->set('user', $user);
    $next($bot);
});


$bot->onCommand('admin', function (Nutgram $bot) {

    $user = $bot->get('user');
    $bot->sendMessage("Hi admin $user->name!");
    
})->middleware(function (Nutgram $bot, $next) {

    $user = $bot->get('user'); // retrieve the user we have set in the global middleware
    if ($user->isAdmin) { // if the user is an admin, continue the chain
        $next($bot);
    }
    $bot->sendMessage('You are not an admin >:(');
});

$bot->onCommand('user', function (Nutgram $bot) {
    $user = $bot->get('user');
    $bot->sendMessage("Hi user $user->name!");
});

$bot->run();
```

## Before & After

The model allow you to perform actions before and after the chain executed:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

// global middleware
$bot->middleware(function (Nutgram $bot, $next) {

    // do something before the handlers
    
    $next($bot); // sends "Hi!"
    
    // do something
});

$bot->onMessage(function (Nutgram $bot) {
    $bot->sendMessage('Hi!');
});

$bot->run();

```

## Skipping global middlewares for a specific handler

If you want to skip the global middlewares for a specific handler, you can use the method `skipGlobalMiddlewares()`:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

// global middlewares
$bot->middleware(GlobalMiddlewareA::class);
$bot->middleware(GlobalMiddlewareB::class);

// handler that skips global middlewares
$bot
    ->onMessage(SendHelloHandler::class)
    ->skipGlobalMiddlewares();

// handler that skips some global middlewares
$bot
    ->onCommand('secret'::class)
    ->skipGlobalMiddlewares([
        GlobalMiddlewareB::class
    ]);

$bot->run();

```

## OOP

Also in this case, all the `$callable` can be also defined as class-method or invokable class:

```php
use SergiX44\Nutgram\Nutgram;

class MyMiddleware {

    public function __invoke(Nutgram $bot, $next) 
    {
      //do stuff
      $next($bot);
    }
}
```

```php
use SergiX44\Nutgram\Nutgram;

class MyCommand {

    public function __invoke(Nutgram $bot, $param) 
    {
      //do stuff
    }
}
```

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

$bot->onCommand('start {param}', MyCommand::class)
    ->middleware(MyMiddleware::class);

$bot->run();
```

### Parameters

You can pass parameters to the middlewares, just using the class constructor:

```php

use SergiX44\Nutgram\Nutgram;
use App\Telegram\Commands\AddChannelCommand;
use App\Telegram\Commands\AddImageCommand;
use App\Telegram\Middleware\CheckUserPermission;

class CheckUserPermission 
{
    protected string $permission;
    
    public function __construct(string $permission)
    {
        $this->permission = $permission;
    }
    
    public function __invoke(Nutgram $bot, $next): void
    {
        //check if user has permssion using $this->permission

        $next($bot);
    }
}

$bot = new Nutgram($_ENV['TOKEN']);

$bot->onCommand('add_channel', AddChannelCommand::class)
    ->middleware(new CheckUserPermission('can_add_channel'));

$bot->onCommand('add_image', AddImageCommand::class)
    ->middleware(new CheckUserPermission('can_add_image'));

$bot->run();
```

## Retrieve handler parameters

The framework provides the `currentParameters` method allowing you to obtain the parameters of the target handler.
You can use this method in any context of the code, not just within middleware.

The `currentParameters` method returns an `array` containing the parameters of the target handler.
In your code, you can use the array returned by the method to access the handler's parameters.

Use case:

```php
$bot = new Nutgram('TOKEN');

$bot->group(function(Nutgram $bot){
    $bot->onCallbackQueryData('user/([0-9]+)/show', [UserController::class, 'show']);
    $bot->onCallbackQueryData('user/([0-9]+)/edit', [UserController::class, 'edit']);
    $bot->onCallbackQueryData('user/([0-9]+)/delete', [UserController::class, 'delete']);
})->middleware(CheckUserMiddleware::class);

$bot->run();
```

Without the `currentParameters` method, you would have to write the following code:

```php
class CheckUserMiddleware
{
    public function __invoke(Nutgram $bot, $next)
    {
        preg_match('/user\/([0-9]+)\/.*/', $bot->callbackQuery()->data, $matches);
        $id = $matches[1];
        // check user by $id
        $next($bot);
    }
}
```

With the `currentParameters` method, you can write the following code:

```php
class CheckUserMiddleware
{
    public function __invoke(Nutgram $bot, $next)
    {
        [$id] = $bot->currentParameters();
        // check user by $id
        $next($bot);
    }
}
```

## Tagging
Nutgram allows you to tag your handlers, so you can easily retrieve them later.

### Usage

<div class="row">
    <div class="col col--6">
        <div style={{marginBottom:10}}><code>tag(string $tag, mixed $value)</code><br/>Tag the current handler</div>
        <div style={{marginBottom:10}}><code>tags(array $tags)</code><br/>Tag the current handler with multiple tags</div>
        <div style={{marginBottom:10}}><code>getTag(string $tag, mixed $default = null)</code><br/>Get the tag of the current handler</div>
        <div style={{marginBottom:10}}><code>getTags()</code><br/>Get the tags of the current handler</div>
    </div>
    <div class="col col--6">
        <div style={{marginBottom:10}}><code>hasTag(string $tag)</code><br/>Check if the current handler has a tag</div>
        <div style={{marginBottom:10}}><code>removeTag(string $tag)</code><br/>Remove a tag from the current handler</div>
        <div style={{marginBottom:10}}><code>clearTags()</code><br/>Clear all tags from the current handler</div>
    </div>
</div>

### Example

```php
$bot = new Nutgram('TOKEN');

$bot->middleware(function (Nutgram $bot, $next) {
    $currentResolvedHandler = $bot->currentResolvedHandler();

    $myTag = $currentResolvedHandler->getTag('foo'); 
    // on '/start' command this will return 'bar' value otherwise null

    $next($bot);
});

$bot->onCommand('start', function (Nutgram $bot) {
    $bot->sendMessage('Hello');
})->tag('foo', 'bar');

$bot->run();
```

## Groups

### Middleware

You can group middlewares, using the `group` method:

```php
// before:
$bot->onCommand('start', StartCommand::class);
$bot->onCommand('help', HelpCommand::class);

$bot->onCommand('mute', MuteCommand::class)->middleware(IsAdmin::class);
$bot->onCommand('kick', KickCommand::class)->middleware(IsAdmin::class);
$bot->onCommand('ban', BanCommand::class)->middleware(IsAdmin::class);
$bot->onCommand('unban', UnbanCommand::class)->middleware(IsAdmin::class);

// after:
$bot->onCommand('start', StartCommand::class);
$bot->onCommand('help', HelpCommand::class);

$bot->group(function (Nutgram $bot){
    $bot->onCommand('mute', MuteCommand::class);
    $bot->onCommand('kick', KickCommand::class);
    $bot->onCommand('ban', BanCommand::class);
    $bot->onCommand('unban', UnbanCommand::class);
})->middleware(IsAdmin::class);
```

### Scope

The `scope()` method allows you to define the visibility of commands within a specific chat context.

In the provided code snippet, `scope(new BotCommandScopeAllPrivateChats())`
restricts the grouped commands to be visible only in private chat conversations with individual users.

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Command\BotCommandScopeAllPrivateChats;

$bot = new Nutgram($_ENV['TOKEN']);

$bot->onCommand('start', function (Nutgram $bot) {
    //
})->description('Start command');

$bot->group(function (Nutgram $bot) {
    $bot->onCommand('private', function (Nutgram $bot) { 
        //
    })->description('A command visible just in a private chat');    
    
    $bot->onCommand('private2', function (Nutgram $bot) { 
        //
    })->description('Another command visible just in a private chat');
})->scope(new BotCommandScopeAllPrivateChats());

$bot->run();
```

For all the available scopes, checkout the [Telegram official doc](https://core.telegram.org/bots/api#botcommandscope).

### Nesting groups

It's also possible to create nested groups

```php
// single middleware
$bot->group(function (Nutgram $bot){
    // Your handlers here
})->middleware(Middleware::class);

// multiple middlewares
$bot->group(function (Nutgram $bot){
    // Your handlers here
})
->middleware(Middleware1::class)
->middleware(Middleware2::class);

// nested middlewares
$bot->group(function (Nutgram $bot){
    // Your handlers here

    $bot->group(function (Nutgram $bot){
        // Your handlers here
    })->scope(/* */)->middleware(Middleware2::class);
    
})->middleware(Middleware1::class)->scope(/* */);
```

### Tagging

You can tag groups as well

```php
$bot->group(function (Nutgram $bot){
    // Your handlers here
})->tag('foo', 'bar');
```
See [Tagging](#tagging) for more info.

## Flow

The global middlewares are executed in descending order.
The handlers middlewares are executed in **ascending** order.

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram('TOKEN');

$bot->middleware(MiddlewareA::class);                   // 1°
$bot->middleware(MiddlewareB::class);                   // 2°

$bot->group(function (Nutgram $bot) {
    $bot->group(function (Nutgram $bot) {
        $bot->onCommand('start', StartCommand::class)   // 8°
             ->middleware(MiddlewareF::class)           // 7°
             ->middleware(MiddlewareG::class);          // 6°
    })->middleware(MiddlewareE::class);                 // 5°
})
->middleware(MiddlewareC::class)                        // 3°
->middleware(MiddlewareD::class);                       // 4°

$bot->run();
```

In the example above, the sequence of the calls is

```mermaid
graph LR
    MiddlewareA-->MiddlewareB
    MiddlewareB-->MiddlewareC
    MiddlewareC-->MiddlewareD
    MiddlewareD-->MiddlewareE
    MiddlewareE-->MiddlewareG
    MiddlewareG-->MiddlewareF
```