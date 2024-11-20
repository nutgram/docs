---
sidebar_position: 1
---

# Getting Updates

Currently, the framework mainly supports two different methods to process updates: `Polling` and `Webhook` mode.

- **Polling**: mainly useful for small bots or with not much traffic, but especially for development mode, since it
  allows you to start developing a bot in a short time!
- **Webhook**: Strongly recommended for bots with high traffic and more generally for production mode.

To begin to process incoming updates, you must call the `->run()` method, at the end:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']); // new instance

// register callbacks
// middlewares
// do your stuff

$bot->run(); // finally, begin to process incoming updates
```

## Polling

This is the **default** running mode, when the `->run()` method is called, will block the script execution and starts
the update loop. This is meant to be used on a CLI or in a service unit.

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\RunningMode\Polling;

$bot = new Nutgram($_ENV['TOKEN']); // new instance
$bot->setRunningMode(Polling::class);

// ...

$bot->run(); // start to listen to updates, until stopped
```

## Webhook

This update mode is recommended for deploy your bot to production, but can be also used with [ngrok](https://ngrok.com) or [expose](https://beyondco.de/docs/expose/introduction) for
development, the only difference is that it requires the webhook set manually.

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\RunningMode\Webhook;

$bot = new Nutgram($_ENV['TOKEN']); // new instance
$bot->setRunningMode(Webhook::class);

// ...

$bot->run(); // after this, the script continues execution
```

After processing the current update, the script continues execution, **BUT** you shouldn't put long operations after the
method anyway, as Telegram expects a response quickly.

### Safe Mode
Nutgram provides a safe mode for webhook, that will check if the request is coming from Telegram, and will skip the update if not.

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

$webhook = new Webhook(secretToken: 'your-secret-token');
$webhook->setSafeMode(true);

$bot->setRunningMode($webhook);
```

:::caution

Make sure to set the same secret token when [you set the webhook](https://core.telegram.org/bots/api#setwebhook) on Telegram, otherwise the update will be skipped.

:::

:::tip
If you are using Laravel, you can skip this section, but take a look at the corresponding section:

- [Laravel](configuration/laravel.md#safe-mode)

:::

### Set url programmatically

You can set the webhook url programmatically, using the `setWebhook` method:

```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);
$bot->setWebhook('your-webhook-url');
```

## Customization

You can create your own running mode, if these do not satisfy you, in fact, you will just create a class that extends
the [`RunningMode`](https://github.com/nutgram/nutgram/blob/master/src/RunningMode/RunningMode.php) interface.

## Retrieving updates manually

You can also use the low level telegram methods, and take over the whole update management, like in the example:

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Common\Update;

$bot = new Nutgram($_ENV['TOKEN']);

// Retrieve te list of pending updates...
$updates = $bot->getUpdates();

/** @var Update $update */
foreach ($updates as $update) {
    // do stuff with your updates
}
```
