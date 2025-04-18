# Introduction

The framework supports some automatic mocking features that allows you to easily create unit tests for your application.
Given the framework-agnostic nature, you are free to use the test library you want (PHPUnit, PEST, etc), in the examples shown PHPUnit will be used.

The framework can be instantiated as a `Fake` instance, all the requests to the Telegram API are stored inside a history, and a mocked response is generated accordingly.
In this way, you can test your business logic, without having to interact at all with the Telegram API.

## Getting a `Fake` instance

:::tip
If you are using Laravel, checkout the section in the [Laravel Integration page](configuration/laravel.md#testing) to see
how to get automatically the fake instance!
:::

How to get a `fake` instance:

```php
use PHPUnit\Framework\TestCase;
use SergiX44\Nutgram\Nutgram;

class BotTest extends TestCase
{
    public function test_retrieve_mocked_instance(): void
    {
        $bot = Nutgram::fake();
        
        // ...
    }
}
```

The `$bot` instance tho, is a clean one with no handlers/middleware registered, so you should have somewhere a method
that register them, for example:

```php
use PHPUnit\Framework\TestCase;
use SergiX44\Nutgram\Testing\FakeNutgram;
use SergiX44\Nutgram\Nutgram;

class BotTest extends TestCase
{
    private FakeNutgram $bot;
    
    public function setUp(): void 
    {
        $this->bot = Nutgram::fake();
        
        // your custom method to register handlers
        $this->bootInstance($this->bot);
        
        /*
         * Example:
         * 
         * $this->bot->onCommand('hello', function (Nutgram $bot) {
         *     $bot->sendMessage('Hello!');
         * });
         */
    }


    public function test_retrieve_mocked_instance(): void
    {
        // define assertions
        $this->bot
            ->hearText('/hello')
            ->reply()
            ->assertReplyText('Hello!');
    }
}
```

## Base Methods

### `reply()`

Executes run a mocked update (and mocked responses) though the bot handlers.
It should be called after the ["will" methods](mocking.mdx) and ["hears" methods](hearing.mdx).

It's like calling the `->run()` method, that also prepare the instance for further assertions and tests.

### `dump()`, `dd()`

To be used wil debugging, it will dump the request generated by the bot. `dump` will output to console, while the `dd`
will also halt the execution.

### `clearCache()`

It empties all the internal caches.

### `getRequestHistory()`

Returns an associative array with the request generated  by the bot, and the mocked response.

### `setCommonUser(User $user)`

Sets a common user that will be used in all the mocked updates.

### `setCommonChat(Chat $chat)`

Sets a common chat that will be used in all the mocked updates.