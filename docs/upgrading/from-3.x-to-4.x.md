
# 🔃 From 3.x to 4.x

> Estimated Upgrade Time: 1.5 Hours

## Updating dependencies

> Likelihood Of Impact: High

### PHP 8.2.0 required
Nutgram now requires PHP 8.2.0 or greater.

### Laravel support moved in another package
Starting from the latest update, the Laravel support for Nutgram has been moved to a new package. To continue utilizing Laravel functionality in Nutgram, it is necessary to install the composer package "nutgram/laravel":

```bash
composer require nutgram/laravel
```

To streamline the integration process, the previous package `nutgram/nutgram` is now included within the `nutgram/laravel` package.<br/>
This means that if you install `nutgram/laravel`, you can safely remove `nutgram/nutgram` as it is already incorporated.

## Enums

### Attributes to Enums

> Likelihood Of Impact: Medium

The Attributes (Class with constants) have been converted to Enums.
If you were previously using the value directly, now you will need to use `->value` to obtain the raw value.

### Renamed namespace

> Likelihood Of Impact: Medium

The namespace has been renamed using `Properties` name:
```diff
- use SergiX44\Nutgram\Telegram\Attributes\X;
+ use SergiX44\Nutgram\Telegram\Properties\X;
```

### Naming

> Likelihood Of Impact: Medium

The names of the enums are now in **singular** form.

| From               | To                |
|:-------------------|:------------------|
| ChatActions        | ChatAction        |
| Emojis             | DiceEmoji         |
| MessageEntityTypes | MessageEntityType |
| MessageTypes       | MessageType       |
| PassportSources    | PassportSource    |
| PassportTypes      | PassportType      |
| UpdateTypes        | UpdateType        |

## Nutgram config

### Config parameter

> Likelihood Of Impact: High

The constructor of the `Nutgram` class now accepts the `Configuration` class as the second parameter. 
However, it is still possible to use the static method `fromArray` to continue using an array.

```diff
- $bot = new Nutgram('TOKEN', [
-     'timeout' => 5 
- ]);
+ $bot = new Nutgram('TOKEN', new Configuration(
+     clientTimeout: 5
+ ));
OR
+ $bot = new Nutgram('TOKEN', Configuration::fromArray([
+     'timeout' => 5
+ );
```

### splitLongMessages option

> Likelihood Of Impact: Medium

The feature "Split long text message to multiple messages" has been removed and replaced by the Chunked endpoints: 
`sendChunkedMessage`, `sendChunkedPhoto`, `sendChunkedAudio`, `sendChunkedDocument`, `sendChunkedVideo`, 
`sendChunkedAnimation`, and `sendChunkedVoice`.

## Types

### StickerSet object

> Likelihood Of Impact: Low

The deprecated `contains_mask` property from `StickerSet` object has been removed.
Use `sticker_type` property instead.

### Custom types

> Likelihood Of Impact: Low

We have made a complete revision by replacing our custom-created objects, namely 
`EditedMessage`, `ChannelPost`, and `EditedChannelPost`, with the `Message` object within the `Update`. 
This change applies to their respective properties: `edited_message`, `channel_post`, and `edited_channel_post`.

## Endpoints

### Signature

> Likelihood Of Impact: Very High

The conversion of all endpoint signatures from **array** to **parameters** enables 
the convenient utilization of **named parameters**. 
Moreover, the parameter sorting will be configured in a way that mandatory parameters come first, 
followed by optional ones, while the `$clientOpt` parameter, if present, will always be placed at the end.

You'll need to convert the usages from the old logic to the new one like this example:
```diff
- $bot->sendMessage('my text', [
-     'disable_notification' => true
- ]);
+ $bot->sendMessage('my text', 
+     disable_notification: true
+ );
```

### Group method

> Likelihood Of Impact: High

The `group` method has been modified from the old logic, where it accepted the middleware as a parameter, 
to the new logic, where the middleware is set using the `middleware` method.

The updated code would be as follows:
```diff
- $bot->group(Middleware::class, function (Nutgram $bot){
-     // Your handlers here
- });
+ $bot->group(function (Nutgram $bot){
+     // Your handlers here
+ })->middleware(Middleware::class);
```

## Handlers

### onPoll handler

> Likelihood Of Impact: Medium

The deprecated `onPoll` handler has been removed.
Instead, you need to use `onUpdatePoll` handler:
```diff
- $bot->onPoll(YourPollHandler::class);
+ $bot->onUpdatePoll(YourPollHandler::class);
```

### Case sensitive pattern

> Likelihood Of Impact: Medium

The `$pattern` parameter used in the specified handlers: `onCallbackQueryData`, `onPreCheckoutQueryPayload`, `onSuccessfulPaymentPayload`, `onText`, `onCommand`, `onException` and `onApiError` is now **case sensitive**.

## Persisting data

### setData & getData
> Likelihood Of Impact: Medium

The methods `setData` and `getData` have been renamed to `set` and `get` respectively.

## Miscellaneous

We also encourage you to view the changes in the `nutgram/nutgram` [GitHub repository](https://github.com/nutgram/nutgram). 
While many of these changes are not required, you may wish to keep these files in sync with your application. 
Some of these changes will be covered in this upgrade guide, but others, 
such as changes to configuration files or comments, will not be.
You can easily view the changes with the [GitHub comparison tool](https://github.com/laravel/laravel/compare/3.x...4.x) 
and choose which updates are important to you.