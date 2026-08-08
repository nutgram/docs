# Handling Exceptions

Exceptions are a common part of programming.
Normally, when an exception is raised, the program will crash.

In Nutgram, exceptions can be categorized into two main types:
- **Exceptions**: These are exceptions that originate from your code.
- **Telegram API Errors**: These are errors that come from the Telegram Bot API.

## Software Exceptions

Software exceptions are errors that occur within your own code. 

To handle these exceptions, you can use a try/catch block or Nutgram's onException handler.

### `onException` handler (generic)

The `onException` handler can be used to catch any exceptions that are not handled elsewhere in your code. 
If defined, this handler will be triggered when an exception occurs within any other handler, 
passing the $exception as the second argument.

```php
use SergiX44\Nutgram\Nutgram;
use Throwable;

$bot = new Nutgram($_ENV['TOKEN']);

// define some handlers ...

// and exception is thrown...
$bot->onMessage(function (Nutgram $bot) {
    // do stuff
    throw new Exception('Oh no!');
});

// ... and passed to the exception handler
$bot->onException(function (Nutgram $bot, Throwable $exception) {
    echo $exception->getMessage(); // Oh no!
    $bot->sendMessage('Whoops!');
});

$bot->run();
```

### `onException` handler (explicit)

The `onException` handler also allows you to specify different callbacks based on the type of exception being thrown:

```php
use SergiX44\Nutgram\Nutgram;
use Exception;
use InvalidArgumentException;

$bot = new Nutgram($_ENV['TOKEN']);

// and exception is thrown...
$bot->onMessage(function (Nutgram $bot) {
    if (random_int(0, 1)) {    
        throw new InvalidArgumentException();
    }
    throw new Exception('Oh no!');
});

$bot->onException(InvalidArgumentException::class, function (Nutgram $bot, InvalidArgumentException $exception) {
    // your code here
});

$bot->onException(Exception::class, function (Nutgram $bot, Exception $exception) {
    // your code here
});

$bot->run();
```

## Telegram API Errors

A Telegram API error occur when the Telegram Bot API returns an error. 

These errors can be handled using `try/catch` blocks or the `onApiError` handler.

### `try/catch`

You can also use a `try/catch` block to catch Telegram API errors.

```php showLineNumbers
$bot = new Nutgram('token');

$bot->onCommand('start', function (Nutgram $bot) {
    try {
        $post = $bot->sendMessage('Hello', chat_id: 123456);
        echo gettype($post).PHP_EOL;
    } catch (Throwable $e){
        echo '[try] '.$e::class. ' => ' . $e->getMessage().PHP_EOL;
    }
});

$bot->run();
```

**Example Output:**
> line 8: [try] SergiX44\Nutgram\Telegram\Exceptions\TelegramException => Forbidden: bot was blocked by the user

### `try/catch` + `registerApiException`

You can register a custom exception class to be thrown when a specific pattern is detected in the error message:

```php
class BotBlocked extends ApiException
{
    public static ?string $pattern = '.*bot was blocked.*';
}
```

```php showLineNumbers
$bot = new Nutgram('token');

$bot->onCommand('start', function (Nutgram $bot) {
    try {
        $post = $bot->sendMessage('Hello', chat_id: 123456);
        echo gettype($post).PHP_EOL;
    } catch (Throwable $e){
        echo '[try] '.$e::class. ' => ' . $e->getMessage().PHP_EOL;
    }
});

$bot->registerApiException(BotBlocked::class);

$bot->run();
```

**Example Output:**
> line 8: [try] App\BotBlocked => Forbidden: bot was blocked by the user

As default, the ApiException class will throw when invoked, but you can also override this behaviour:

```php
class UserDeactivatedException extends ApiException
{
    public static ?string $pattern = '.*deactivated.*';

    public function __invoke(Nutgram $bot, TelegramException $e)
    {
        // override this method to change the default behaviour:
        throw new static($e->getMessage(), $e->getCode(), $e);
    }
}
```

### `onApiError` handler

The `onApiError` handler allows you to handle Telegram API errors globally.

```php showLineNumbers
$bot = new Nutgram('token');

$bot->onCommand('start', function (Nutgram $bot) {
    $post = $bot->sendMessage('Hello', chat_id: 123456);
    echo gettype($post).PHP_EOL;
});

$bot->onApiError(function (Nutgram $bot, TelegramException $e) {
    echo '[onApiError] '.$e::class. ' => ' . $e->getMessage().PHP_EOL;
});

$bot->run();
```

**Example Output:**
> line 9: [onApiError] SergiX44\Nutgram\Telegram\Exceptions\TelegramException => Forbidden: bot was blocked by the user<br/>
> line 5: NULL

Like the onException, the handler support a regex matching the text returned by the telegram api:

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Exceptions\TelegramException;

$bot = new Nutgram($_ENV['TOKEN']);

$bot->onMessage(function (Nutgram $bot) {
    $bot->sendMessage(
        text: 'Invalid call!',
        chat_id: null,
    );
});

$bot->onApiError('chat not found', function (Nutgram $bot, TelegramException $exception) {
    //
});


$bot->onApiError('user(.*)deactivated', function (Nutgram $bot, TelegramException $exception) {
    //
});

$bot->run();
```

### `TelegramException` methods

The `TelegramException` class has some useful methods to get more information about the error:

```php
use SergiX44\Nutgram\Nutgram;
use SergiX44\Nutgram\Telegram\Exceptions\TelegramException;

$bot = new Nutgram($_ENV['TOKEN']);

$bot->onMessage(function (Nutgram $bot) {
    foreach(range(1,200) as $i){
        $bot->sendMessage('Too many calls!');
    }
});

$bot->onApiError(function (Nutgram $bot, TelegramException $exception) {
    echo $exception->getMessage(); // Too Many Requests: retry after 14
    echo $exception->getCode(); // 429
    echo $exception->getParameters(); // ['retry_after' => 14]
    echo $exception->getParameter('retry_after'); // 14
    echo $exception->hasParameter('retry_after'); // true
});

$bot->run();
```