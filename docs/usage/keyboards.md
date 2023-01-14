# Keyboards

Nutgram provides a better way to create keyboards.

## Inline Keyboard

The `InlineKeyboard` class helps you to create inline keyboards.
Here is an example:

```php
$bot->onCommand('start', function(Nutgram $bot){
    $bot->sendMessage('Welcome!', [
        'reply_markup' => InlineKeyboardMarkup::make()
            ->addRow(
                InlineKeyboardButton::make('A', callback_data: 'type:a'), 
                InlineKeyboardButton::make('B', callback_data: 'type:b')
            )
    ]);
});

$bot->onCallbackQuery('type:a', function(Nutgram $bot){
    $bot->answerCallbackQuery('You selected A');
});

$bot->onCallbackQuery('type:b', function(Nutgram $bot){
    $bot->answerCallbackQuery('You selected B');
});
```

:::info
To handle inline keyboard callbacks as a Menu, you can check the [Inline Menu](/docs/usage/inline_menu) section.
:::

## Reply Keyboard

The `ReplyKeyboard` class helps you to create reply keyboards.
Here is an example:

```php
$bot->onCommand('start', function(Nutgram $bot){
    $bot->sendMessage('Welcome!', [
        'reply_markup' => ReplyKeyboardMarkup::make()->addRow(
            KeyboardButton::make('Give me food!'),
            KeyboardButton::make('Give me animal!'),
        )
    ]);
});

$bot->onText('Give me food!', function (Nutgram $bot) {
    $bot->sendMessage('Apple!');
});

$bot->onText('Give me animal!', function (Nutgram $bot) {
    $bot->sendMessage('Dog!');
});
```

### Optional keyboard parameters

You can pass optional parameters to the `ReplyKeyboardMarkup` class:

```php
ReplyKeyboardMarkup::make(
    resize_keyboard: true,
    one_time_keyboard: true,
    input_field_placeholder: 'Type something',
    selective: true,
);
```

Check the [Telegram API documentation](https://core.telegram.org/bots/api#replykeyboardmarkup) for more information.

### Remove the Reply Keyboard

To remove the reply keyboard, you can use the `ReplyKeyboardRemove` class:

```php
$bot->onCommand('cancel', function (Nutgram $bot) {
    $bot->sendMessage('Removing keyboard...', [
        'reply_markup' => ReplyKeyboardRemove::make(true),
    ])?->delete();
});
```

## Force Reply

The `ForceReply` class helps you to force the user to reply to a message.
Here is an example:

```php
$bot->onCommand('start', function(Nutgram $bot){
    $bot->sendMessage('Welcome!', [
        'reply_markup' => ForceReply::make(
            force_reply: true,
            input_field_placeholder: 'Type something',
            selective: true,
        ),
    ]);
});
```