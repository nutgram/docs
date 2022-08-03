---
sidebar_position: 3
---

# Laravel Integration

If you are using the Laravel framework, much of the setup is handled automatically for you. First, you should install
the package via composer as usual (see [the installation page](installation.md#composer))

In you `.env` file, you should only define the `TELEGRAM_TOKEN` var, that's it!

```bash
TELEGRAM_TOKEN="api-telegram-token"
```

The framework instance, is available anywhere via the DI container, for example:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use SergiX44\Nutgram\Nutgram;

class TelegramController extends Controller
{
    /**
     * Handle the request.
     */
    public function handle(Nutgram $bot)
    {
        //
    }
}
```

## Configuration

To expose the undelying configuration, you need to publish the configuration file:

```bash
php artisan vendor:publish --provider="SergiX44\Nutgram\NutgramServiceProvider" --tag="nutgram"
```

In the `config/nutgram.php` file, you will find something like that:

```php
    // The Telegram BOT api token
    'token' => env('TELEGRAM_TOKEN'),

    // if the webhook mode must validate the incoming IP range is from a telegram server
    'safe_mode' => env('APP_ENV', 'local') === 'production',

    // Extra or specific configurations
    'config' => [],

    // Set if the service provider should automatically load
    // handlers from /routes/telegram.php
    'routes' => true,

    // Enable or disable Nutgram mixins
    'mixins' => false,
```

The second `config` array, is basically any configuration option, already
explained [here](installation.md#configuration).

The third `routes`, set if the service provider should load the handlers form the folder `routes/telegram.php`, by
default is `true`.

## Commands

The framework automatically register some useful commands in your Laravel application:

- `nutgram:list`
    - List all registered handlers
- `nutgram:hook:info`
    - Get current webhook status
- `nutgram:hook:remove {--d|drop-pending-updates}`
    - Remove the bot webhook
- `nutgram:hook:set {url}`
    - Set the bot webhook
- `nutgram:register-commands`
    - Register the bot commands, see [automatically-register-bot-commands](../usage/handlers.md#automatically-register-bot-commands)
- `nutgram:run`
    - Start the bot in long polling mode. Useful in development mode.
- `nutgram:make:command {name}`
  - Create a new command class 
- `nutgram:make:conversation {name} {--menu}`
  - Create a new conversation class
- `nutgram:make:handler {name}`
  - Create a new handler class
- `nutgram:make:middleware {name}`
  - Create a new middleware class
- `nutgram:ide:generate`
  - Generate a file helping IDEs to autocomplete [mixins](#mixins) methods.


## Handlers definition

The `routes/telegram.php` should be something like this:

```php
<?php
/** @var SergiX44\Nutgram\Nutgram $bot */

use SergiX44\Nutgram\Nutgram;

/*
|--------------------------------------------------------------------------
| Nutgram Handlers
|--------------------------------------------------------------------------
|
| Here is where you can register telegram handlers for Nutgram. These
| handlers are loaded by the NutgramServiceProvider. Enjoy!
|
*/

$bot->onCommand('start', function (Nutgram $bot) {
    return $bot->sendMessage('Hello, world!');
})->description('The start command!');
```

This file is automatically loaded by the framework, so here is where you should define middleware, handlers and
conversations.

## Mixins

Nutgram provides a few mixins to help you work best with Laravel.

Just enable the `mixins` option in the `config/nutgram.php` file, and you will be able to use them in your handlers.

- `Nutgram` class:
  - `downloadFileToDisk(File $file, string $path, string $disk = null, array $clientOpt = []): bool`<br/>
    _Save a File to Laravel disk._ 

- `File` class:
  - `saveToDisk(string $path, string $disk = null, array $clientOpt = []): bool`<br/>
    _Save the File to Laravel disk._


## Webhook updates

For production mode, the webhook mode is recommended. Run the bot in that way is really simple, you should just create a
new controller `php artisan make:controller FrontController`, and call the `run` method on the bot instance:

```php
class FrontController extends Controller
{
    /**
     * Handle the telegram webhook request.
     */
    public function __invoke(Nutgram $bot)
    {
        $bot->run();
    }
}
```

:::tip
When calling the `run()` method on the bot instance, it automatically recognize if use the `Polling` method to retrieve updates,
or `Webhook`, based on whether the current instance is running in a cli process, or is serving a web request.
:::

and remember to register it on you http routes:

```php
// routes/api.php

Route::post('/webhook', 'FrontController');
```

## Testing

Inside unit tests, you can automatically retrieve the `fake` instance with all your handlers and middleware loaded, 
simply by resolving it via DI:

```php
namespace Tests\Feature;

use SergiX44\Nutgram\Nutgram;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * @return void
     */
    public function test_bot()
    {
        $bot = app(Nutgram::class);
        
        // ...
    }
}
```