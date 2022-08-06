---
sidebar_position: 1
---

# Installation

## Composer

You can install the package as usual via Composer:

```bash
composer require nutgram/nutgram
```

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

$config = [
    'timeout' => 10, // default in seconds, when contacting the Telegram API
];

$bot = new Nutgram('you telegram token here', $config);
```

Here a list of all the options you can specify:

### `api_url`

- **type:** string
- **default:** `'https://api.telegram.org'`
- Useful if you need to change to a local API server.

### `is_local`

- **type:** boolean
- **default:** `false`
- Enable the local mode when used along a self-hosted Telegram Bot API server.<br/>
_Nutgram will copy the file from your Telegram Bot API server instead downloading it._

### `local_path_transformer`

- **type:** callable(string $path): string
- **default:** `null`
- Useful if you need to remap a relative file path when used along `is_local` config.

### `test_env`

- **type:** boolean
- **default:** `null`
- Enable test environments useful when working with [Web Apps](https://core.telegram.org/bots/webapps#testing-web-apps).

### `timeout`

- **type:** integer
- **default:** `10`
- In seconds, define the timeout when sending requests to the Telegram API.

### `cache`

- **type:** string or instance
- **default:** `ArrayCache`
- The object used to store conversation and data, must implements the PSR-16 `CacheInterface`.

### `client`

- **type:** array
- **default:** `[]`
- An array of options for the underlying [Guzzle HTTP client](https://docs.guzzlephp.org/en/stable/quickstart.html).
  Checkout the Guzzle documentation for further informations.

### `polling`

- **type:** array
- **default:** `['timeout' => 10, 'limit' => 100]`
- Contains all the options that used when requesting updates to Telegram via the `getUpdates`, it's possible to specify
  also the field `allowed_updates` if you want.

### `split_long_messages`

- **type:** boolean
- **default:** `false`
- Split long text message to multiple messages.<br/>
This is useful when you want to send a message longer than the maximum length allowed by Telegram.<br/>
Available only with the `sendMessage` method. (It will returns an array of Message)<br/>
Optional `reply_markup` parameter will be sent on last message.