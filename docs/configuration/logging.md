---
sidebar_position: 3
---

# Logging

Nutgram accepts as a logger system any adapter that implements the PSR-3 `LoggerInterface` interface.

By default, it uses the internal `NullLogger` class, 
which is a fall-back "black hole" implementation if no logger is given to it.

## Configuration

:::tip
If you are using Laravel, you can skip this section, since the service provider automatically inject the Laravel cache repository for you.

[Check out the Laravel integration page](laravel.md)
:::

To specify a different logger adapter, you need to pass the instance at the bot instantiation. The following example, we
are using the built-in `SergiX44\Nutgram\Logger\ConsoleLogger`, that can be used to log the requests to the console.
Useful when used with Polling running mode.

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Logger\ConsoleLogger;

$bot = new Nutgram('TOKEN', [
    'logger' => ConsoleLogger::class
]);
```