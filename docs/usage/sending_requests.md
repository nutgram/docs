---
sidebar_position: 2
---

# Sending Requests

The framework creates a 1:1 mapping of the methods Telegram provides that are directly accessible from the main
instance. The only difference is in the parameters that telegram marks as *Optional*: these are specifiable via the last
parameter (present in almost all methods) as an associative array.

For example:

```php

use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Message\Message;

$bot = new Nutgram($_ENV['TOKEN']);

// Send a message to a specific user
/** @var Message $message */
$message = $bot->sendMessage('Hi!', ['chat_id' => 111222333]);

// Send a message to a channel
/** @var Message $message */
$message = $bot->sendMessage('Hi channel!', ['chat_id' => '@mychannel']);
```

## Uploading media

For any method that require an [`InputFile`](https://core.telegram.org/bots/api#inputfile), you can pass a resource file
descriptor to the right method, and the framework will take care of how uploading it, like in the following example.

If you already have the Telegram `file_id`, you can simply specify it.

```php

use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Message\Message;

$bot = new Nutgram($_ENV['TOKEN']);

// Send a photo to a specific user
$photo = fopen('image.png', 'r+'); // open the file
/** @var Message $message */
$message = $bot->sendPhoto($photo, ['chat_id' => 111222333]); // pass the resource
fclose($photo); // close the file!


$video = fopen('funnyvideo.mp4', 'r+');
/** @var Message $message */
$message = $bot->sendPhoto($video, ['chat_id' => 111222333]);
fclose($video);

// send a sticker via file_id
$fileId = $bot->message()->sticker->file_id;
/** @var Message $message */
$message = $bot->sendSticker($fileId, ['chat_id' => 111222333]);
```

## Downloading media

As opposed to uploading, there are some additional methods available that allow you to download files:

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Media\File;

$bot = new Nutgram($_ENV['TOKEN']);

$fileId = $bot->message()->sticker->file_id;

// get the File object
/** @var File $message */
$file = $bot->getFile($fileId);

$bot->downloadFile($file, 'path/to/file');

// OR, via helper method

$bot->getFile($fileId)->save('file/or/directory');

```

## Formatting options

The framework give you some helper constants to format your text messages:

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Attributes\ParseMode;
use SergiX44\Nutgram\Telegram\Types\Message\Message;

$bot = new Nutgram($_ENV['TOKEN']);

// Send a message formatting in markdown
/** @var Message $message */
$message = $bot->sendMessage('*Hi!*', [
    'chat_id' => 111222333,
    'parse_mode' => ParseMode::MARKDOWN,
]);

// Send a message formatting in html
/** @var Message $message */
$message = $bot->sendMessage('<i>Hi!</i>', [
    'chat_id' => 111222333,
    'parse_mode' => ParseMode::HTML,
]);

```

## Available methods
<table>
   <thead>
      <tr>
         <th>Method</th>
         <th>Return Type</th>
         <th>Telegram Docs</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><code>getMe()</code></td>
         <td><code>?User</code></td>
         <td><a href="https://core.telegram.org/bots/api#getme">#getme</a></td>
      </tr>
      <tr>
         <td><code>logOut()</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#logout">#logout</a></td>
      </tr>
      <tr>
         <td><code>close()</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#close">#close</a></td>
      </tr>
      <tr>
         <td><code>sendMessage(string $text, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendmessage">#sendmessage</a></td>
      </tr>
      <tr>
         <td><code>forwardMessage(string|int $chat_id, string|int $from_chat_id, int $message_id, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#forwardmessage">#forwardmessage</a></td>
      </tr>
      <tr>
         <td><code>copyMessage(string|int $chat_id, string|int $from_chat_id, int $message_id, array $opt = [])</code></td>
         <td><code>?MessageId</code></td>
         <td><a href="https://core.telegram.org/bots/api#copymessage">#copymessage</a></td>
      </tr>
      <tr>
         <td><code>sendPhoto($photo, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendphoto">#sendphoto</a></td>
      </tr>
      <tr>
         <td><code>sendAudio($audio, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendaudio">#sendaudio</a></td>
      </tr>
      <tr>
         <td><code>sendDocument($document, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#senddocument">#senddocument</a></td>
      </tr>
      <tr>
         <td><code>sendVideo($video, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendvideo">#sendvideo</a></td>
      </tr>
      <tr>
         <td><code>sendAnimation($video, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendanimation">#sendanimation</a></td>
      </tr>
      <tr>
         <td><code>sendVoice($voice, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendvoice">#sendvoice</a></td>
      </tr>
      <tr>
         <td><code>sendVideoNote($video_note, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendvideonote">#sendvideonote</a></td>
      </tr>
      <tr>
         <td><code>sendMediaGroup(array $media, array $opt = [])</code></td>
         <td><code>?array</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendmediagroup">#sendmediagroup</a></td>
      </tr>
      <tr>
         <td><code>sendLocation(float $latitude, float $longitude, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendlocation">#sendlocation</a></td>
      </tr>
      <tr>
         <td><code>editMessageLiveLocation(float $latitude, float $longitude, ?array $opt = [])</code></td>
         <td><code>Message|bool|null</code></td>
         <td><a href="https://core.telegram.org/bots/api#editmessagelivelocation">#editmessagelivelocation</a></td>
      </tr>
      <tr>
         <td><code>stopMessageLiveLocation(?array $opt = [])</code></td>
         <td><code>Message|bool|null</code></td>
         <td><a href="https://core.telegram.org/bots/api#stopmessagelivelocation">#stopmessagelivelocation</a></td>
      </tr>
      <tr>
         <td><code>sendVenue(float $latitude, float $longitude, string $title, string $address, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendvenue">#sendvenue</a></td>
      </tr>
      <tr>
         <td><code>sendContact(string $first_name, string $phone_number, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendcontact">#sendcontact</a></td>
      </tr>
      <tr>
         <td><code>sendPoll(string $question, array $options, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendpoll">#sendpoll</a></td>
      </tr>
      <tr>
         <td><code>sendDice(?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#senddice">#senddice</a></td>
      </tr>
      <tr>
         <td><code>sendChatAction(string $action, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendchataction">#sendchataction</a></td>
      </tr>
      <tr>
         <td><code>getFile(string $file_id)</code></td>
         <td><code>?File</code></td>
         <td><a href="https://core.telegram.org/bots/api#getfile">#getfile</a></td>
      </tr>
      <tr>
         <td><code>kickChatMember(string|int $chat_id, int $user_id, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#kickchatmember">#kickchatmember</a></td>
      </tr>
      <tr>
         <td><code>unbanChatMember(string|int $chat_id, int $user_id, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#unbanchatmember">#unbanchatmember</a></td>
      </tr>
      <tr>
         <td><code>restrictChatMember(string|int $chat_id, int $user_id, ChatPermissions $permissions, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#restrictchatmember">#restrictchatmember</a></td>
      </tr>
      <tr>
         <td><code>promoteChatMember(string|int $chat_id, int $user_id, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#promotechatmember">#promotechatmember</a></td>
      </tr>
      <tr>
         <td><code>setChatAdministratorCustomTitle(string|int $chat_id, int $user_id, string $custom_title, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setchatadministratorcustomtitle">#setchatadministratorcustomtitle</a></td>
      </tr>
      <tr>
         <td><code>setChatPermissions(string|int $chat_id, ChatPermissions $permissions, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setchatpermissions">#setchatpermissions</a></td>
      </tr>
      <tr>
         <td><code>exportChatInviteLink(string|int $chat_id)</code></td>
         <td><code>?string</code></td>
         <td><a href="https://core.telegram.org/bots/api#exportchatinvitelink">#exportchatinvitelink</a></td>
      </tr>
      <tr>
         <td><code>createChatInviteLink(string|int $chat_id, ?array $opt = [])</code></td>
         <td><code>?ChatInviteLink</code></td>
         <td><a href="https://core.telegram.org/bots/api#createchatinvitelink">#createchatinvitelink</a></td>
      </tr>
      <tr>
         <td><code>editChatInviteLink(string|int $chat_id, string $invite_link, ?array $opt = [])</code></td>
         <td><code>?ChatInviteLink</code></td>
         <td><a href="https://core.telegram.org/bots/api#editchatinvitelink">#editchatinvitelink</a></td>
      </tr>
      <tr>
         <td><code>revokeChatInviteLink(string|int $chat_id, string $invite_link)</code></td>
         <td><code>?ChatInviteLink</code></td>
         <td><a href="https://core.telegram.org/bots/api#revokechatinvitelink">#revokechatinvitelink</a></td>
      </tr>
      <tr>
         <td><code>setChatPhoto(string|int $chat_id, $photo)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setchatphoto">#setchatphoto</a></td>
      </tr>
      <tr>
         <td><code>deleteChatPhoto(string|int $chat_id)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#deletechatphoto">#deletechatphoto</a></td>
      </tr>
      <tr>
         <td><code>setChatTitle(string|int $chat_id, string $title)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setchattitle">#setchattitle</a></td>
      </tr>
      <tr>
         <td><code>setChatDescription(string|int $chat_id, ?string $description = null)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setchatdescription">#setchatdescription</a></td>
      </tr>
      <tr>
         <td><code>pinChatMessage(string|int $chat_id, int $message_id, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#pinchatmessage">#pinchatmessage</a></td>
      </tr>
      <tr>
         <td><code>unpinChatMessage(string|int $chat_id, int $message_id)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#unpinchatmessage">#unpinchatmessage</a></td>
      </tr>
      <tr>
         <td><code>unpinAllChatMessages(string|int $chat_id)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#unpinallchatmessages">#unpinallchatmessages</a></td>
      </tr>
      <tr>
         <td><code>leaveChat(string|int $chat_id)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#leavechat">#leavechat</a></td>
      </tr>
      <tr>
         <td><code>getChat(string|int $chat_id)</code></td>
         <td><code>?Chat</code></td>
         <td><a href="https://core.telegram.org/bots/api#getchat">#getchat</a></td>
      </tr>
      <tr>
         <td><code>getChatAdministrators(string|int $chat_id)</code></td>
         <td><code>?array</code></td>
         <td><a href="https://core.telegram.org/bots/api#getchatadministrators">#getchatadministrators</a></td>
      </tr>
      <tr>
         <td><code>getChatMembersCount(string|int $chat_id)</code></td>
         <td><code>?int</code></td>
         <td><a href="https://core.telegram.org/bots/api#getchatmemberscount">#getchatmemberscount</a></td>
      </tr>
      <tr>
         <td><code>getChatMember(string|int $chat_id, int $user_id)</code></td>
         <td><code>?ChatMember</code></td>
         <td><a href="https://core.telegram.org/bots/api#getchatmember">#getchatmember</a></td>
      </tr>
      <tr>
         <td><code>setChatStickerSet(string|int $chat_id, string $sticker_set_name)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setchatstickerset">#setchatstickerset</a></td>
      </tr>
      <tr>
         <td><code>deleteChatStickerSet(string|int $chat_id)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#deletechatstickerset">#deletechatstickerset</a></td>
      </tr>
      <tr>
         <td><code>answerCallbackQuery(?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#answercallbackquery">#answercallbackquery</a></td>
      </tr>
      <tr>
         <td><code>setMyCommands(array $commands = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setmycommands">#setmycommands</a></td>
      </tr>
      <tr>
         <td><code>getMyCommands()</code></td>
         <td><code>?array</code></td>
         <td><a href="https://core.telegram.org/bots/api#getmycommands">#getmycommands</a></td>
      </tr>
      <tr>
         <td><code>editMessageText(string $text, ?array $opt = [])</code></td>
         <td><code>Message|bool|null</code></td>
         <td><a href="https://core.telegram.org/bots/api#editmessagetext">#editmessagetext</a></td>
      </tr>
      <tr>
         <td><code>editMessageCaption(?array $opt = [])</code></td>
         <td><code>Message|bool|null</code></td>
         <td><a href="https://core.telegram.org/bots/api#editmessagecaption">#editmessagecaption</a></td>
      </tr>
      <tr>
         <td><code>editMessageMedia(array $media, ?array $opt = [])</code></td>
         <td><code>Message|bool|null</code></td>
         <td><a href="https://core.telegram.org/bots/api#editmessagemedia">#editmessagemedia</a></td>
      </tr>
      <tr>
         <td><code>editMessageReplyMarkup(?array $opt = [])</code></td>
         <td><code>Message|bool|null</code></td>
         <td><a href="https://core.telegram.org/bots/api#editmessagereplymarkup">#editmessagereplymarkup</a></td>
      </tr>
      <tr>
         <td><code>stopPoll(string|int $chat_id, int $message_id, ?array $opt = [])</code></td>
         <td><code>?Poll</code></td>
         <td><a href="https://core.telegram.org/bots/api#stoppoll">#stoppoll</a></td>
      </tr>
      <tr>
         <td><code>deleteMessage(string|int $chat_id, int $message_id)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#deletemessage">#deletemessage</a></td>
      </tr>
      <tr>
         <td><code>sendSticker($sticker, array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendsticker">#sendsticker</a></td>
      </tr>
      <tr>
         <td><code>getStickerSet(string $name)</code></td>
         <td><code>?StickerSet</code></td>
         <td><a href="https://core.telegram.org/bots/api#getstickerset">#getstickerset</a></td>
      </tr>
      <tr>
         <td><code>createNewStickerSet(string $name, string $title, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#createnewstickerset">#createnewstickerset</a></td>
      </tr>
      <tr>
         <td><code>setStickerPositionInSet(string $sticker, int $position)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setstickerpositioninset">#setstickerpositioninset</a></td>
      </tr>
      <tr>
         <td><code>deleteStickerFromSet(string $sticker)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#deletestickerfromset">#deletestickerfromset</a></td>
      </tr>
      <tr>
         <td><code>setStickerSetThumb(string $name, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setstickersetthumb">#setstickersetthumb</a></td>
      </tr>
      <tr>
         <td><code>answerInlineQuery(array $results, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#answerinlinequery">#answerinlinequery</a></td>
      </tr>
      <tr>
         <td><code>sendInvoice(string $title, string $description, string $payload, string $provider_token, string $start_parameter, string $currency, array $prices, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendinvoice">#sendinvoice</a></td>
      </tr>
      <tr>
         <td><code>answerShippingQuery(bool $ok, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#answershippingquery">#answershippingquery</a></td>
      </tr>
      <tr>
         <td><code>answerPreCheckoutQuery(bool $ok, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#answerprecheckoutquery">#answerprecheckoutquery</a></td>
      </tr>
      <tr>
         <td><code>setPassportDataErrors(int $user_id, array $errors)</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setpassportdataerrors">#setpassportdataerrors</a></td>
      </tr>
      <tr>
         <td><code>sendGame(string $game_short_name, ?array $opt = [])</code></td>
         <td><code>?Message</code></td>
         <td><a href="https://core.telegram.org/bots/api#sendgame">#sendgame</a></td>
      </tr>
      <tr>
         <td><code>setGameScore(int $score, ?array $opt = [])</code></td>
         <td><code>?bool</code></td>
         <td><a href="https://core.telegram.org/bots/api#setgamescore">#setgamescore</a></td>
      </tr>
      <tr>
         <td><code>getGameHighScores(?array $opt = [])</code></td>
         <td><code>?array</code></td>
         <td><a href="https://core.telegram.org/bots/api#getgamehighscores">#getgamehighscores</a></td>
      </tr>
   </tbody>
</table>
