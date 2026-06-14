# Rate Limiting

Nutgram offers a powerful rate-limiting feature to safeguard your bot from abuse.<br/>
You can set rate limits for specific handlers, groups, or the entire bot, 
ensuring users can only make a controlled number of requests within a defined time frame.

:::info
The rate limiter will run only for updates with the `user.id` and `chat.id` set.<br/>
This means that the rate limiter will be skipped for updates without these fields.
:::

To apply a rate limiter, use the `throttle` method.

**Available Rate Limits**
- **Handler Rate Limit**: restricts the execution of a specific handler (highest priority).
- **Group Rate Limit**: restricts the execution of handlers within a specific group.
- **Global Rate Limit**: restricts the execution of any handler in the bot (lowest priority).

:::caution
- Each call to `throttle` overrides the previous one.
- The rate limiter follows a hierarchy: **Handler > Group > Global**.<br/>
  This means that a rate limiter applied at the **Handler level** will override any limits set at the **Group** or **Global** level.<br/>
  Similarly, a **Group rate limit** will override a **Global rate limit**, but not a **Handler rate limit**.
:::

## Rate Limiters

### Global Rate Limit

A global rate limiter can be set once and will apply to all handlers.

```php
$bot = new Nutgram('your-token-here');
$bot->throttle(10); 

$bot->onCommand('start', StartCommand::class); // 10 messages per minute
$bot->onCommand('help', HelpCommand::class); // 10 messages per minute

$bot->run();
```

### Group Rate Limit

A group rate limiter can be set for a specific group of handlers.

```php
$bot = new Nutgram('your-token-here');

$bot->group(function(Nutgram $bot){
    $bot->onCommand('start', StartCommand::class); // 3 messages per minute
    $bot->onCommand('help', HelpCommand::class); // 3 messages per minute
})->throttle(3);

$bot->run();
```


### Handler Rate Limit

A handler rate limiter can be set for a specific handler.

```php
$bot = new Nutgram('your-token-here');

$bot->onCommand('start', StartCommand::class)->throttle(5); // 5 messages per minute
$bot->onCommand('help', HelpCommand::class)->throttle(5); // 5 messages per minute

$bot->run();
```

## Throttle Parameters

The `throttle` method accepts the following parameters:

| Parameter       | Type      | Default | Description                                               |
|:----------------|:----------|:--------|:----------------------------------------------------------|
| maxAttempts     | int       |         | The number of messages allowed in the time frame          |
| decaySeconds    | int       | 60      | The time frame in seconds                                 |
| key             | ?string   | null    | A unique key to identify the group for the rate limiter   |
| warningCallback | ?callable | null    | A callback to be executed when the rate limit is exceeded |

## Skip Rate Limiter

You can skip the rate limiter for a specific handler by calling the `withoutThrottle` method.

```php
$bot = new Nutgram('your-token-here');
$bot->throttle(5);

$bot->onCommand('start', StartCommand::class); // 5 messages per minute
$bot->onCommand('help', HelpCommand::class)->withoutThrottle(); // No rate limiter

$bot->run();
```

## Rate Limit Exceeded

When the rate limit is exceeded, the bot will send a message (**once**) to the user with the following text:

> Too many messages, please wait a bit. This message will only be sent once until the rate limit is reset.

If you want to customize this message, you can set your logic in the throttle method:

```php
$bot = new Nutgram('your-token-here');

$bot->onCommand('start', StartCommand::class)
    ->throttle(5, warningCallback: function (Nutgram $bot, int $availableIn) {
        $bot->sendMessage("You're sending too many messages. Please wait $availableIn seconds.");
    });
```

## Advanced example

```php
$bot = new Nutgram('your-token-here');
$bot->throttle(4);

$bot->onCommand('start', StartCommand::class); // 4 messages per minute
$bot->onCommand('help', HelpCommand::class)->throttle(2); // 2 messages per minute

$bot->group(function (Nutgram $bot) {

    $bot->onCommand('feedback', FeedbackCommand::class); // 3 messages per minute
    $bot->onCommand('stats', StatsCommand::class)->throttle(2); // 2 messages per minute
    $bot->onCommand('what', WhatCommand::class)->throttle(5); // 5 messages per minute

    $bot->group(function (Nutgram $bot) {
    
        $bot->onCommand('settings', SettingsCommand::class); // 2 messages per minute
        $bot->onCommand('donate', DonateCommand::class)->throttle(1); // 1 message per minute
        $bot->onCommand('refund', RefundCommand::class)->throttle(3); // 3 messages per minute
        
    })->throttle(2);
    
})->throttle(3);

```