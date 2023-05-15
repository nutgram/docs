---
sidebar_position: 5
---

# 💻 Symfony

Instead of installing the base `nutgram/nutgram` base package, you have to install the bundle version:

```bash
composer require nutgram/symfony-bundle

# remove the base package if you have installed it:
# composer remove nutgram/nutgram
```

If you are not using Symfony Flex, you have to register the bundle inside your `bundles.php` config file.

## Configuration

### Config files

A Flex recipe is not available yet, but there is a console command that will create the `config/telegram.php`, where you
should register your handlers, and `config/packages/nutgram.yaml`, the bundle config file:

```bash
php bin/console nutgram:init
```

And in your `.env` file, you should also define the `TELEGRAM_TOKEN`:

```bash
TELEGRAM_TOKEN="api-telegram-token"
```

### `services.yaml` configuration

To make the most of Symfony's dependency injection, you should choose a namespace under which to place your commands,
handlers, conversations, menus ...
By default, we advice to put under `App\Telegram`, and configure it in this way:

```yaml
# config/services.yaml

services:

  # ... other configs ...

  # Nutgram handlers
  App\Telegram\:
    public: true
    shared: false
    resource: '../src/Telegram'
```

Set `public` to true, so the framework is able to inject services in your handlers using the symfony container, and
`shared` to false, otherwise it will store the conversations instances, and you will not able to proceed with the
conversation steps.

And you folder tree should be something like this, for example:

```text
src/
├─ Telegram/
│  ├─ Command/
│  │  ├─ StartCommand.php
│  │  ├─ HelpCommand.php
│  ├─ Middleware/
│  │  ├─ GetUser.php
│  ├─ Conversation/
│  ├─ Menu/
```

### Enable conversation refresh

Not mandatory, but highly recommended, [explained here.](usage/conversations.md#refreshing-deserialized-conversations)
This allows you to inject services, such as Doctrine repositories, Twig templates, translators, and so on (which are
not usually serializable).
You can put the call on top of the `config/telegram.php` route file:

```php
// config/telegram.php

/** @var SergiX44\Nutgram\Nutgram $bot */

use SergiX44\Nutgram\Conversations\Conversation;

Conversation::refreshOnDeserialize();

// ...
```

## Commands

The bundle automatically registers these additional commands:

- `nutgram:init`
    - Creates the initial config files
- `nutgram:hook:info`
    - Get current webhook status
- `nutgram:hook:remove {--d|drop-pending-updates}`
    - Remove the bot webhook
- `nutgram:hook:set {url}`
    - Set the bot webhook
- `nutgram:register-commands`
    - Register the bot commands,
      see [automatically-register-bot-commands](../usage/handlers#automatically-register-bot-commands)
- `nutgram:run`
    - Start the bot in long polling mode. Useful in development mode.
- `nutgram:logout {--d|drop-pending-updates}`
    - Log out from the cloud Bot API server

## Logging

If you are using Monolog, the framework automatically binds on these two channels:

```yaml
# config/packages/monolog.yaml

monolog:
  channels:
    - deprecation
    - nutgram_console # logs here only when runs in background processes (console)
    - nutgram # logs here in any other case

  # if you are using polling for development, create a new stdout channel for the console
  # to see the requests in real time
  when@dev:
    monolog:
      handlers:
        # ...
        stdout:
          type: stream
          path: "php://stdout"
          channels: [ "nutgram_console" ]
 ```

## Cache

The framework automatically get configured by Symfony if you have installed `symfony/cache`, the only thing you have to
do is define a cache pool for the framework:

```yaml
# config/packages/cache.yaml
framework:
  cache:

    # ...

    pools:
      nutgram.cache:
        adapter: cache.adapter.redis # or whatever adapter you want
        tags: true

```

## Webhook updates

When running inside a web context, the Webhook running mode is automatically configured and handlers automatically
loaded.

```php
<?php

namespace App\Controller;

use SergiX44\Nutgram\Nutgram;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FrontController extends AbstractController
{
    #[Route('/hook', name: 'app_webhook')]
    public function hook(Nutgram $bot): Response
    {
        $bot->run();
        
        return new Response();
    }
}
```
