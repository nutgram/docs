# Bulk Messenger

:::caution

This feature is **experimental** and it may change in the future.

:::

Bulk Messenger is a tool that lets you automatically send Telegram Messages to a list of Chats.

## Methods

- `using(callable $action)` - Executes the given action with the current instance of the Bulk Messenger.<br/>
  Default:
  ```php
  function (Nutgram $bot, int|string $chatId): void {
      $bot->sendMessage(...[...$this->opt, 'chat_id' => $chatId, 'text' => $this->text]);
  };
  ```
- `setChats(array $chats)` - Sets the chats to send the message to.<br/>
  Default: `[]`
- `setInterval(int $seconds)` - Sets the interval between each message.<br/>
  Default: `2`
- `setText(string $text)` - Sets the text of the message.<br/>
  Default: `'Hello!'`
- `setOpt(array $params)` - Sets the parameters of the message.<br/>
  Default: `[]`
- `startAsync()` - Starts the sending process in the background.<br/>
  Supported OS: `Linux`, `MacOS`.
- `startSync()` - Starts the sending process in the foreground.<br/>
  Supported OS: `Linux`, `Windows`, `MacOS`.

## Usage


```php
use SergiX44\Nutgram\Nutgram;

$bot = new Nutgram($_ENV['TOKEN']);

$chats = [];

// Using the default sendMessage method ***************************************

// in scripts
$bot->getBulkMessenger()
    ->setChats($chats)
    ->setText('Hello!')
    ->setOpt([/* optional parameters */])
    ->startSync()

// inside handlers (polling)
$bot->onCommand('start', function (Nutgram $bot) use ($chats) {
    $bot->getBulkMessenger()
        ->setChats($chats)
        ->setText('Hello!')
        ->setOpt([/* optional parameters */])
        ->startAsync();
});
$bot->run();

// Using a custom method ******************************************************

// in scripts
$bot->getBulkMessenger()
    ->setChats($chats)
    ->using(fn (Nutgram $bot, int $chatId) => $bot->sendDocument(document: $document, chat_id: $chatId))
    ->startSync();

// inside handlers (polling)
$bot->onCommand('start', function (Nutgram $bot) use ($document, $chats) {
    $bot->getBulkMessenger()
        ->setChats($chats)
        ->using(fn (Nutgram $bot, int $chatId) => $bot->sendDocument(document: $document, chat_id: $chatId))
        ->startAsync();
});
$bot->run();

```