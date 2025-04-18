---
sidebar_position: 4
---

# Laravel

Instead of installing the base `nutgram/nutgram` package, you have to install a specific version of the package:

```bash
composer require nutgram/laravel

# remove the base package if you have installed it:
# composer remove nutgram/nutgram
```

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
php artisan vendor:publish --provider="Nutgram\Laravel\NutgramServiceProvider" --tag="nutgram"
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

    // Path to save files generated by nutgram:make command
    'namespace' => app_path('Telegram'),

    // Set log channel
    'log_channel' => env('TELEGRAM_LOG_CHANNEL', 'null'),
```

The second `config` array, is basically any configuration option, already
explained [here](installation.md#configuration).<br/>

:::caution
However, please remember to convert the keys to **snake_case**.<br/>
Additionally, any keys starting with `polling` should be divided into a sub-array.
:::

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
    - Register the bot commands, see [automatically register bot commands](../usage/handlers#automatically-register-bot-commands)
- `nutgram:run`
    - Start the bot in long polling mode. Useful in development mode.
- `nutgram:make:command {name}`
  - Create a new command class, see [Commands](../usage/handlers#registercommand)
- `nutgram:make:conversation {name} {--menu}`
  - Create a new conversation class, see [Conversations](../usage/conversations#creating-conversations)
- `nutgram:make:handler {name}`
  - Create a new handler class, see [Handlers](../usage/handlers#oop)
- `nutgram:make:middleware {name}`
  - Create a new middleware class, see [Middleware](../usage/middleware#oop)
- `nutgram:make:exception {name}`
  - Create a new ApiException class, see [Register API exceptions](../usage/handlers#register-api-exceptions)
- `nutgram:ide:generate`
  - Generate a file helping IDEs to autocomplete [mixins](#mixins) methods.
- `nutgram:logout {--d|drop-pending-updates}`
  - Log out from the cloud Bot API server

# Cache

The cache adapter gets automatically configured by Laravel; make sure to configure the appropriate driver inside your
`config/cache.php` and `.env` file.

## Logging

### `telegram` channel
The framework provides a channel to log any data you want to a Telegram chat.<br/>
To use it, you need to create the `telegram` channel inside the `config/logging.php` file:

```php
'telegram' => [
    'driver' => 'custom',
    'via' => \Nutgram\Laravel\Log\NutgramLogger::class,
    'level' => 'debug',
    'chat_id' => env('NUTGRAM_LOG_CHAT_ID'), // any chat_id where bot can write messages
]
```

Now, you can log any data to the chat using the `telegram` channel:

```php
Log::channel('telegram')->info('Hello world!', ['xyz' => 123]);
```

#### Output:
![logger](https://i.imgur.com/Gph2XmO.png)

### `nutgram` channel
The framework provides a channel formatter to show the [Nutgram logs](../configuration/logging) in a more readable way in the console.<br/>
To use it, you need to create the `nutgram` channel inside the `config/logging.php` file:

```php
'nutgram' => [
    'driver' => 'monolog',
    'level' => env('LOG_LEVEL', 'debug'),
    'handler' => StreamHandler::class,
    'formatter' => Nutgram\Laravel\Log\NutgramFormatter::class,
    'with' => [
        'stream' => 'php://stderr',
    ],
    'processors' => [PsrLogMessageProcessor::class],
],
```

Then add the `nutgram` channel to the `TELEGRAM_LOG_CHANNEL` env var:

```dotenv
TELEGRAM_LOG_CHANNEL=nutgram
```

#### Output:
![logger](https://i.imgur.com/SU7P8Ug.png)

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

### Safe Mode
The safe mode is enabled by default via the `safe_mode` option in the `config/nutgram.php` file.

When enabled, the webhook mode will validate the incoming update using a secret token.

:::caution

Make sure to set the bot webhook via the `nutgram:hook:set` command! 

:::

## Facade support

Nutgram provides a Facade to access the bot instance anywhere in your application.

You can use it like this:

```php
use Nutgram\Laravel\Facades\Telegram;

Telegram::sendMessage('Hello, world!');
```

You can use the Facade in your `telegram.php` routes file too:

```php
use Nutgram\Laravel\Facades\Telegram;

Telegram::onCommand('start', function () {
    Telegram::sendMessage('Hello, world!');
});
```

## Middleware

### ValidateWebAppData
Nutgram provides a middleware to validate the data received from the [Mini App](https://core.telegram.org/bots/webapps).<br/>
Just add the middleware to the route you want to protect:

```php
use Nutgram\Laravel\Middleware\ValidateWebAppData;

Route::middleware(ValidateWebAppData::class)->group(function () {
    // your routes here
});
``` 
:::caution
Remember to pass the `initData` parameter in order to validate the data, 
see [Mini App](https://core.telegram.org/bots/webapps) for more info.
:::

:::tip
To get the [`WebAppData`](https://github.com/nutgram/nutgram/blob/master/src/Telegram/Web/WebAppData.php) object
inside your routes, you can use the `webAppData()` helper function.
:::


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
