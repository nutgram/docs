"use strict";(self.webpackChunknutgram_docs=self.webpackChunknutgram_docs||[]).push([[1477],{30010:function(e){e.exports=JSON.parse('{"blogPosts":[{"id":"nutgram-4","metadata":{"permalink":"/blog/nutgram-4","editUrl":"https://github.com/nutgram/docs/tree/master/blog/2023-05-23-nutgram-4.md","source":"@site/blog/2023-05-23-nutgram-4.md","title":"Nutgram 4 \ud83d\ude80","description":"We are thrilled to unveil Nutgram 4.x, an exciting update packed with new features and improvements to enhance","date":"2023-05-23T00:00:00.000Z","formattedDate":"May 23, 2023","tags":[{"label":"nutgram","permalink":"/blog/tags/nutgram"},{"label":"symfony","permalink":"/blog/tags/symfony"},{"label":"major","permalink":"/blog/tags/major"},{"label":"release","permalink":"/blog/tags/release"}],"readingTime":1.89,"hasTruncateMarker":false,"authors":[{"name":"Sergio Brighenti","title":"Maintainer","url":"https://github.com/sergix44","imageURL":"https://github.com/sergix44.png","key":"sergix44"}],"frontMatter":{"slug":"nutgram-4","title":"Nutgram 4 \ud83d\ude80","authors":"sergix44","tags":["nutgram","symfony","major","release"]},"nextItem":{"title":"Nutgram \ud83e\udd1d Symfony","permalink":"/blog/symfony-support"}},"content":"We are thrilled to unveil Nutgram 4.x, an exciting update packed with new features and improvements to enhance\\nyour Telegram bot development experience. Here\'s a closer look at the key changes:\\n\\n### PHP 8.2\\n\\nTo ensure a smooth transition, make sure to update your dependencies as now is required PHP 8.2.0 or greater. This\\nhigher requirement unlocks new capabilities and improvements, so be sure to prepare your environment accordingly.\\n\\n### Endpoint Signature\\n\\nOne of the significant changes in 4.x is the conversion of all endpoint signatures from an array to named\\nparameters. This update enables the convenient utilization of named parameters and improves parameter sorting. Mandatory\\nparameters now come first, followed by optional ones, while the `$clientOpt` parameter, if present, will always be\\nplaced at the end.\\n\\nFor example, previously, you might have used:\\n\\n```php\\n$bot->sendMessage(\'my text\', [\\n    \'disable_notification\' => true\\n]);\\n```\\n\\nIn 4.x, has to be changed to:\\n\\n```php\\n$bot->sendMessage(\'my text\',\\n    disable_notification: true\\n);\\n```\\n\\n### `->group` Method\\n\\nThe group method has undergone modifications in its usage. Previously, it accepted the middleware as a parameter, but\\nnow the middleware is set using the middleware method. Update your code to reflect this change:\\n\\n```php\\n$bot->group(function (Nutgram $bot){\\n    // Your handlers here\\n})->middleware(Middleware::class);\\n```\\n\\n### Enums\\n\\nIn 4.x, we have converted Attributes (Class with constants) to Enums. If you were directly using the value\\nbefore, you will now need to use `->value` to obtain the raw value. This change has a medium impact and should be\\naddressed during the upgrade.\\n\\n### Laravel Support Moved to a Separate Package\\n\\nWith the latest update, we have separated the Laravel support into a new package called `nutgram/laravel`.\\nYou have to install this package using Composer:\\n\\n```bash\\ncomposer require nutgram/laravel\\n```\\n\\nTo streamline the integration process, the previous package, `nutgram/nutgram`, is now included within `\\nnutgram/laravel`. Once you have `nutgram/laravel` installed, you can safely remove `nutgram/nutgram` as it is already\\nincorporated.\\n\\nThese high-impact changes require your attention to ensure a seamless transition to 4.x. Be sure to update\\nyour code accordingly to take full advantage of the new features and improvements.\\n\\nWe encourage you to explore the [complete upgrade guide](/docs/upgrading/from-3.x-to-4.x) and review the changes in the\\nrepository on GitHub.\\nUpgrade now and elevate your Telegram bot development to new heights. Happy coding!"},{"id":"symfony-support","metadata":{"permalink":"/blog/symfony-support","editUrl":"https://github.com/nutgram/docs/tree/master/blog/2023-02-28-symfony-support.md","source":"@site/blog/2023-02-28-symfony-support.md","title":"Nutgram \ud83e\udd1d Symfony","description":"We are excited to announce that a new bundle is now available for developers using Symfony with Nutgram! \ud83e\udd73 The bundle","date":"2023-02-28T00:00:00.000Z","formattedDate":"February 28, 2023","tags":[{"label":"nutgram","permalink":"/blog/tags/nutgram"},{"label":"symfony","permalink":"/blog/tags/symfony"}],"readingTime":0.375,"hasTruncateMarker":false,"authors":[{"name":"Sergio Brighenti","title":"Maintainer","url":"https://github.com/sergix44","imageURL":"https://github.com/sergix44.png","key":"sergix44"}],"frontMatter":{"slug":"symfony-support","title":"Nutgram \ud83e\udd1d Symfony","authors":"sergix44","tags":["nutgram","symfony"]},"prevItem":{"title":"Nutgram 4 \ud83d\ude80","permalink":"/blog/nutgram-4"},"nextItem":{"title":"Hello World!","permalink":"/blog/hello-world"}},"content":"We are excited to announce that a new bundle is now available for developers using Symfony with Nutgram! \ud83e\udd73 The bundle\\nprovides seamless integration with Symfony and unlocks new features and\\nfunctionality for developers to create even more powerful and customizable bots. We believe this addition will enhance\\nthe development experience for our community and look forward to seeing what our users will create with this new tool.\\n\\n[Check out the new documentation page \ud83d\uddc4](/docs/configuration/symfony)"},{"id":"hello-world","metadata":{"permalink":"/blog/hello-world","editUrl":"https://github.com/nutgram/docs/tree/master/blog/2022-03-06-hello-world.md","source":"@site/blog/2022-03-06-hello-world.md","title":"Hello World!","description":"Welcome to the new Nutgram documentation website!","date":"2022-03-06T00:00:00.000Z","formattedDate":"March 6, 2022","tags":[{"label":"hello","permalink":"/blog/tags/hello"},{"label":"world","permalink":"/blog/tags/world"}],"readingTime":0.035,"hasTruncateMarker":false,"authors":[{"name":"Sergio Brighenti","title":"Maintainer","url":"https://github.com/sergix44","imageURL":"https://github.com/sergix44.png","key":"sergix44"}],"frontMatter":{"slug":"hello-world","title":"Hello World!","authors":"sergix44","tags":["hello","world"]},"prevItem":{"title":"Nutgram \ud83e\udd1d Symfony","permalink":"/blog/symfony-support"}},"content":"Welcome to the new Nutgram documentation website!"}]}')}}]);