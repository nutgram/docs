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

- **type:** string
- **default:** `'https://api.telegram.org'`
- Useful if you need to change to a local API server.

### `botName`

- **type:** string
- **default:** `null`
- Useful when the bot is a group bot (with [Group Privacy](https://core.telegram.org/bots/features#privacy-mode) *
  *disabled**) and you need to specify the bot name.

### `isLocal`

- **type:** boolean
- **default:** `false`
- Enable the local mode when used along a self-hosted Telegram Bot API server.<br/>
  _Nutgram will copy the file from your Telegram Bot API server instead downloading it._

### `localPathTransformer`

- **type:** callable(string $path): string
- **default:** `null`
- Useful if you need to remap a relative file path when used along `is_local` config.

### `testEnv`

- **type:** boolean
- **default:** `false`
- Enable test environments useful when working with [Web Apps](https://core.telegram.org/bots/webapps#testing-web-apps).

### `clientTimeout`

- **type:** integer
- **default:** `5`
- In seconds, define the timeout when sending requests to the Telegram API.

### `cache`

- **type:** string or instance
- **default:** `SergiX44\Nutgram\Cache\Adapters\ArrayCache`
- The object used to store conversation and data, must implements the PSR-16 `CacheInterface`.

### `clientOptions`

- **type:** array
- **default:** `[]`
- An array of options for the underlying [Guzzle HTTP client](https://docs.guzzlephp.org/en/stable/quickstart.html).
  Checkout the Guzzle documentation for further informations.

### `pollingTimeout`

- **type:** integer
- **default:** `10`
- In seconds, define the timeout when polling updates from the Telegram API.

### `pollingLimit`

- **type:** integer
- **default:** `100`
- Define the maximum number of updates to be retrieved from the Telegram API.

### `pollingAllowedUpdates`

- **type:** array
- **default:** `['message', 'edited_message', 'channel_post', 'edited_channel_post', 'inline_query', 'chosen_inline_result', 'callback_query', 'shipping_query', 'pre_checkout_query', 'poll', 'poll_answer', 'my_chat_member', 'chat_member', 'chat_join_request'];`
- Define the allowed updates to be retrieved from the Telegram API.

### `logger`

- **type:** `Psr\Log\LoggerInterface`
- **default:** `Psr\Log\NullLogger`
- The logger used to log debug http requests.<br/>
  [Check out the Logging page for other info.](logging)