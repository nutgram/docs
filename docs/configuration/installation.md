---
sidebar_position: 4
---

# Installation

## Composer

You can install the package as usual via Composer:

```bash
composer require nutgram/nutgram
```

:::tip
If you are using Laravel or Symfony frameworks, be sure to read their dedicated pages for a better
development experience.

- [Laravel](laravel.md)
- [Symfony](symfony.md)
:::

## Configuration

The framework can work out-of-the-box without much configuration, the only mandatory parameter is (obviously) the
Telegram API token:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram('you telegram token here');
```

In addition, it's possible to specify a list of options as second argument, like that:

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Configuration;

$config = new Configuration(
    clientTimeout: 10, // default in seconds, when contacting the Telegram API
);

$bot = new Nutgram('you telegram token here', $config);
```

Here a list of all the options you can specify:

### `apiUrl`

- **type:** `string`
- **default:** `'https://api.telegram.org'`
- Useful if you need to change to a local or different API server.<br/>
  **WARNING:** If the server does not support HTTP/2, remember to disable `enableHttp2` in the configuration.

### `enableHttp2`

- **type:** `bool`
- **default:** `true`
- Enable HTTP/2 support

### `botName`

- **type:** `string`
- **default:** `null`
- Useful when the bot is a group bot 
  (with [Group Privacy](https://core.telegram.org/bots/features#privacy-mode) **disabled**) 
  and you need to specify the bot name.

### `isLocal`

- **type:** `bool`
- **default:** `false`
- Enable the local mode when used along a self-hosted Telegram Bot API server.<br/>
  _Nutgram will copy the file from your Telegram Bot API server instead downloading it._<br/>
  **WARNING:** If your local server does not support HTTP/2, remember to disable `enableHttp2` in the configuration.

### `localPathTransformer`

- **type:** `callable(string $path): string`
- **default:** `null`
- Useful if you need to remap a relative file path when used along `is_local` config.

### `testEnv`

- **type:** `bool`
- **default:** `false`
- Enable test environments useful when working with [Web Apps](https://core.telegram.org/bots/webapps#testing-web-apps).

### `clientTimeout`

- **type:** `int`
- **default:** `5`
- In seconds, define the timeout when sending requests to the Telegram API.

### `cache`

- **type:** `string` (FQCN) or class instance
- **default:** `SergiX44\Nutgram\Cache\Adapters\ArrayCache`
- The object used to store conversation and data, must implements the PSR-16 `CacheInterface`.

### `conversationTtl`

- **type:** `DateInterval|int|null`
- **default:** `43200` (12 hours)
- The time-to-live for a conversation in seconds or a `DateInterval` object.<br/>
  Set to `null` to disable the TTL.

### `clientOptions`

- **type:** `array`
- **default:** `[]`
- An array of options for the underlying [Guzzle HTTP client](https://docs.guzzlephp.org/en/stable/quickstart.html).<br/>
  Checkout the Guzzle documentation for further informations.

### `pollingTimeout`

- **type:** `int`
- **default:** `10`
- In seconds, define the timeout when polling updates from the Telegram API.

### `pollingLimit`

- **type:** `int`
- **default:** `100`
- Define the maximum number of updates to be retrieved from the Telegram API.

### `pollingAllowedUpdates`

- **type:** `array`
- **default:** `['message', 'edited_message', 'channel_post', 'edited_channel_post', 'business_connection', 'business_message', 'edited_business_message', 'deleted_business_messages', 'message_reaction', 'message_reaction_count', 'inline_query', 'chosen_inline_result', 'callback_query', 'shipping_query', 'pre_checkout_query', 'purchased_paid_media', 'poll', 'poll_answer', 'my_chat_member', 'chat_member', 'chat_join_request', 'chat_boost', 'removed_chat_boost'];`
- Define the allowed updates to be retrieved from the Telegram API.

### `logger`

- **type:** `Psr\Log\LoggerInterface`
- **default:** `Psr\Log\NullLogger`
- The logger used to log debug http requests.<br/>
  [Check out the Logging page for other info.](logging)

### `container`

- **type:** `Psr\Container\ContainerInterface`
- **default:** `null`
- Delegate container to resolve dependencies.