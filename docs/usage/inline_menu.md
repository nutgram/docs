---
sidebar_position: 6
---

# Inline Menu

The `InlineMenu` class extends [Conversation](conversations.md) and help you to provide an easy interface to
create inline menu messages in your bot.

## Methods

- `menuText(string $text, array $opt = [])`<br/>
  Set the message text and the optional message parameters

- `addButtonRow(... InlineKeyboardButton $buttons)`<br/>
  Set a row of buttons to the current message<br/>
  When you use a button with `callback_data`, you must set
  the value as `callbackData@methodName` and create a method with the name `methodName`

- `clearButtons()`<br/>
  Remove the buttons from the current message

- `orNext(?string $orNext)`<br/>
  Call a method if there is no matching handlers

- `showMenu(bool $reopen = false, bool $noHandlers = false, bool $noMiddlewares = false)`<br/>
  Send the message with buttons

- `closeMenu()`<br/>
  Close the menu deleting the current message

### Changing Telegram method type
Override the following methods only to change the Telegram method used:

- `doOpen()`<br/>
  Send the message. Default: `sendMessage`

- `doUpdate()`<br/>
  Edit the message. Default: `editMessageText`

- `doClose()`<br/>
  Delete the message. Default: `deleteMessage`

## Example

```php
class ChooseColorMenu extends InlineMenu
{

    public function start(Nutgram $bot)
    {
        $this->menuText('Choose a color:')
            ->addButtonRow(InlineKeyboardButton::make('Red', callback_data: 'red@handleColor'))
            ->addButtonRow(InlineKeyboardButton::make('Green', callback_data: 'green@handleColor'))
            ->addButtonRow(InlineKeyboardButton::make('Yellow', callback_data: 'yellow@handleColor'))
            ->orNext('none')
            ->showMenu();
    }

    public function handleColor(Nutgram $bot)
    {
        $color = $bot->callbackQuery()->data;
        $this->menuText("Choosen: $color!")
            ->showMenu();
    }

    public function none(Nutgram $bot)
    {
        $bot->sendMessage('Bye!');
        $this->end();
    }
}
```

Result:

![example](https://i.imgur.com/IQ63ruH.gif)
