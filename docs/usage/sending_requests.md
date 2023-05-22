---
sidebar_position: 2
---

# Sending Requests

The framework creates a 1:1 mapping of the methods Telegram provides that are directly accessible from the main
instance. The parameters of these methods are organized to prioritize mandatory parameters, followed by optional ones.
If the `$clientOpt` parameter is included, it will consistently be positioned at the end.
We recommend the use of named parameters, which allow the developer to explicitly specify the values for each parameter, 
making the code easier to read and maintain.

For example:

```php

use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Message\Message;

$bot = new Nutgram($_ENV['TOKEN']);

// Send a message to a specific user
/** @var Message $message */
$message = $bot->sendMessage(
    text: 'Hi!',
    chat_id: 111222333
);

// Send a message to a channel
/** @var Message $message */
$message = $bot->sendMessage(
    text: 'Hi channel!',
    chat_id: '@mychannel'
);
```

## Uploading media

For any method that require an [`InputFile`](https://core.telegram.org/bots/api#inputfile), you can pass a resource file
descriptor to the right method, and the framework will take care of how uploading it, like in the following example.

If you already have the Telegram `file_id`, you can simply specify it.

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Types\Internal\InputFile;
use SergiX44\Nutgram\Telegram\Types\Message\Message;

$bot = new Nutgram($_ENV['TOKEN']);

// Send a photo to a specific user ***********************************************
$photo = fopen('image.png', 'r+'); // open the file

/** @var Message $message */
$message = $bot->sendPhoto(
    photo: InputFile::make($photo), // create the input file
    chat_id: 111222333
);


// Send a video to a specific user ***********************************************
$video = fopen('funnyvideo.mp4', 'r+'); // open the file

/** @var Message $message */
$message = $bot->sendVideo(
    video: InputFile::make($video),
    chat_id: 111222333
);


// send a sticker via file_id ****************************************************
$fileId = $bot->message()->sticker->file_id;

/** @var Message $message */
$message = $bot->sendSticker(
    sticker: $fileId,
    chat_id: 111222333
);
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
$message = $bot->sendMessage(
    text: '*Hi!*',
    chat_id: 111222333,
    parse_mode: ParseMode::MARKDOWN,
);

// Send a message formatting in html
/** @var Message $message */
$message = $bot->sendMessage(
    text: '<i>Hi!</i>',
    chat_id: 111222333,
    parse_mode: ParseMode::HTML,
);
```

## Available methods
See the [Telegram Bot API](https://core.telegram.org/bots/api#available-methods) for the available native methods.

## Chunked methods
Nutgram helps manage character limits by splitting messages into smaller ones,
making it easier to stay within the limits set by platforms or media.
Chunking methods allow users to transmit longer messages without exceeding the maximum character limits.

Available chunked methods:
- sendChunkedMessage
- sendChunkedPhoto
- sendChunkedAudio
- sendChunkedDocument
- sendChunkedVideo
- sendChunkedAnimation
- sendChunkedVoice
