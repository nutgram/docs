# Web Validation

Nutgram provides a simple way to validate the data received from a Login Widget or a Mini App.

## Login Widget

The Telegram [Login Widget](https://core.telegram.org/widgets/login) is a simple way to authorize users on your website.

Nutgram provides the `validateLoginData` method to validate the data received from the widget.<br/>
If the data is valid, the method returns a 
[`LoginData`](https://github.com/nutgram/nutgram/blob/master/src/Telegram/Web/LoginData.php) object, 
otherwise it throws an `InvalidDataException`.

```php
// $initData MUST BE a query string value like this: 
// id=12345678&first_name=Mario&last_name=Super&username=SuperMario&photo_url=photourl&auth_date=1693264973&hash=1a2b3c4d5e6f

// Tip: you can user the http_build_query to get the query string from an array via $_POST variable.

try {
	$loginData = $bot->validateLoginData($initData);
	//$loginData->id
	//$loginData->toArray()['id']
} catch (InvalidDataException) {
	echo 'Invalid data!';
}
```

## Mini App
With [Mini Apps](https://core.telegram.org/bots/webapps) developers can use JavaScript to create infinitely flexible interfaces 
that can be launched right inside Telegram — and can completely replace any website.

### Validating data received via the Mini App

Nutgram provides the `validateWebAppData` method to validate the data received from the Mini App.<br/>
If the data is valid, the method returns a 
[`WebAppData`](https://github.com/nutgram/nutgram/blob/master/src/Telegram/Web/WebAppData.php) object,
otherwise it throws an `InvalidDataException`.

```php
// $initData MUST BE a query string value like this: 
// user=%7B%22id%22%3A12345678%2C%22first_name%22%3A%22Mario%22%2C%22last_name%22%3A%22Super%22%2C%22username%22%3A%22SuperMario%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-123456789&chat_type=private&start_param=foo&auth_date=1693264973&hash=1a2b3c4d5e6f

// how to get $initData from frontend (example): 
// $initData = $_GET['initData'] or $_POST['initData'];
// initData is an example key name provided by frontend

try {
	$webappData = $bot->validateWebAppData($initData);
	//$webappData->user->id
	//$webappData->toArray()['user']['id']
} catch (InvalidDataException) {
	echo 'Invalid data!';
}
```

### Validating data for Third-Party Use

Nutgram provides the `validateWebAppDataForThirdParty` method to validate the data received from the Mini App 
for third-party use. This method can validate the data without requiring access to your bot's token.

Simply provide them with your `bot_id` and the data from the `Telegram.WebApp.initData` field.<br/>
If the data is valid, the method returns a
[`WebAppData`](https://github.com/nutgram/nutgram/blob/master/src/Telegram/Web/WebAppData.php) object,
otherwise it throws an `InvalidDataException`.

```php
// $initData MUST BE a query string value like this: 
// user=%7B%22id%22%3A12345678%2C%22first_name%22%3A%22Mario%22%2C%22last_name%22%3A%22Super%22%2C%22username%22%3A%22SuperMario%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-123456789&chat_type=private&start_param=foo&auth_date=1693264973&hash=1a2b3c4d5e6f

// how to get $initData from frontend (example): 
// $initData = $_GET['initData'] or $_POST['initData'];
// initData is an example key name provided by frontend

try {
	$webappData = Nutgram::validateWebAppDataForThirdParty(123456789, $initData);
	//$webappData->user->id
	//$webappData->toArray()['user']['id']
} catch (InvalidDataException) {
	echo 'Invalid data!';
}
```