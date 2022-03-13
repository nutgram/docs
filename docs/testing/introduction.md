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
        $this->bootInstance($this->bot);    
    }


    public function test_retrieve_mocked_instance(): void
    {
        // define assertions
    }
}
```