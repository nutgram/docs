"use strict";(self.webpackChunknutgram_docs=self.webpackChunknutgram_docs||[]).push([[8674],{56002:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return r},default:function(){return m},frontMatter:function(){return i},metadata:function(){return o},toc:function(){return s}});var a=t(83117),l=(t(67294),t(3905));t(56022);const i={sidebar_position:4},r="Laravel",o={unversionedId:"configuration/laravel",id:"version-3.x/configuration/laravel",title:"Laravel",description:"If you are using the Laravel framework, much of the setup is handled automatically for you. First, you should install",source:"@site/versioned_docs/version-3.x/configuration/laravel.md",sourceDirName:"configuration",slug:"/configuration/laravel",permalink:"/docs/3.x/configuration/laravel",draft:!1,editUrl:"https://github.com/nutgram/docs/tree/master/versioned_docs/version-3.x/configuration/laravel.md",tags:[],version:"3.x",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docs",previous:{title:"Logging",permalink:"/docs/3.x/configuration/logging"},next:{title:"Symfony",permalink:"/docs/3.x/configuration/symfony"}},u={},s=[{value:"Configuration",id:"configuration",level:2},{value:"Commands",id:"commands",level:2},{value:"Logging",id:"logging",level:2},{value:"Output:",id:"output",level:4},{value:"Handlers definition",id:"handlers-definition",level:2},{value:"Mixins",id:"mixins",level:2},{value:"Webhook updates",id:"webhook-updates",level:2},{value:"Testing",id:"testing",level:2}],p={toc:s};function m(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"laravel"},"Laravel"),(0,l.kt)("p",null,"If you are using the Laravel framework, much of the setup is handled automatically for you. First, you should install\nthe package via composer as usual (see ",(0,l.kt)("a",{parentName:"p",href:"/docs/3.x/configuration/installation#composer"},"the installation page"),")"),(0,l.kt)("p",null,"In you ",(0,l.kt)("inlineCode",{parentName:"p"},".env")," file, you should only define the ",(0,l.kt)("inlineCode",{parentName:"p"},"TELEGRAM_TOKEN")," var, that's it!"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'TELEGRAM_TOKEN="api-telegram-token"\n')),(0,l.kt)("p",null,"The framework instance, is available anywhere via the DI container, for example:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Http\\Controllers\\Controller;\nuse SergiX44\\Nutgram\\Nutgram;\n\nclass TelegramController extends Controller\n{\n    /**\n     * Handle the request.\n     */\n    public function handle(Nutgram $bot)\n    {\n        //\n    }\n}\n")),(0,l.kt)("h2",{id:"configuration"},"Configuration"),(0,l.kt)("p",null,"To expose the undelying configuration, you need to publish the configuration file:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},'php artisan vendor:publish --provider="SergiX44\\Nutgram\\NutgramServiceProvider" --tag="nutgram"\n')),(0,l.kt)("p",null,"In the ",(0,l.kt)("inlineCode",{parentName:"p"},"config/nutgram.php")," file, you will find something like that:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"    // The Telegram BOT api token\n    'token' => env('TELEGRAM_TOKEN'),\n\n    // if the webhook mode must validate the incoming IP range is from a telegram server\n    'safe_mode' => env('APP_ENV', 'local') === 'production',\n\n    // Extra or specific configurations\n    'config' => [],\n\n    // Set if the service provider should automatically load\n    // handlers from /routes/telegram.php\n    'routes' => true,\n\n    // Enable or disable Nutgram mixins\n    'mixins' => false,\n\n    // Path to save files generated by nutgram:make command\n    'namespace' => app_path('Telegram'),\n\n    // Set log channel\n    'log_channel' => env('TELEGRAM_LOG_CHANNEL', 'null'),\n")),(0,l.kt)("p",null,"The second ",(0,l.kt)("inlineCode",{parentName:"p"},"config")," array, is basically any configuration option, already\nexplained ",(0,l.kt)("a",{parentName:"p",href:"/docs/3.x/configuration/installation#configuration"},"here"),"."),(0,l.kt)("p",null,"The third ",(0,l.kt)("inlineCode",{parentName:"p"},"routes"),", set if the service provider should load the handlers form the folder ",(0,l.kt)("inlineCode",{parentName:"p"},"routes/telegram.php"),", by\ndefault is ",(0,l.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,l.kt)("h2",{id:"commands"},"Commands"),(0,l.kt)("p",null,"The framework automatically register some useful commands in your Laravel application:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:list"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"List all registered handlers"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:hook:info"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Get current webhook status"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:hook:remove {--d|drop-pending-updates}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Remove the bot webhook"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:hook:set {url}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Set the bot webhook"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:register-commands"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Register the bot commands, see ",(0,l.kt)("a",{parentName:"li",href:"../usage/handlers#automatically-register-bot-commands"},"automatically-register-bot-commands")))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:run"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Start the bot in long polling mode. Useful in development mode."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:make:command {name}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Create a new command class "))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:make:conversation {name} {--menu}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Create a new conversation class"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:make:handler {name}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Create a new handler class"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:make:middleware {name}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Create a new middleware class"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:ide:generate"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Generate a file helping IDEs to autocomplete ",(0,l.kt)("a",{parentName:"li",href:"#mixins"},"mixins")," methods."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"nutgram:logout {--d|drop-pending-updates}"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Log out from the cloud Bot API server")))),(0,l.kt)("h1",{id:"cache"},"Cache"),(0,l.kt)("p",null,"The cache adapter gets automatically configured by Laravel; make sure to configure the appropriate driver inside your\n",(0,l.kt)("inlineCode",{parentName:"p"},"config/cache.php")," and ",(0,l.kt)("inlineCode",{parentName:"p"},".env")," file."),(0,l.kt)("h2",{id:"logging"},"Logging"),(0,l.kt)("p",null,"The framework provides a channel to log any data you want to a Telegram chat.\nTo use it, you need to create the ",(0,l.kt)("inlineCode",{parentName:"p"},"telegram")," channel inside the ",(0,l.kt)("inlineCode",{parentName:"p"},"config/logging.php")," file:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"'telegram' => [\n    'driver' => 'custom',\n    'via' => \\SergiX44\\Nutgram\\Laravel\\Log\\NutgramLogger::class,\n    'level' => 'debug',\n    'chat_id' => env('NUTGRAM_LOG_CHAT_ID'), // any chat_id where bot can write messages\n]\n")),(0,l.kt)("p",null,"Now, you can log any data to the chat using the ",(0,l.kt)("inlineCode",{parentName:"p"},"telegram")," channel:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"Log::channel('telegram')->info('Hello world!', ['xyz' => 123]);\n")),(0,l.kt)("h4",{id:"output"},"Output:"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://i.imgur.com/Gph2XmO.png",alt:"logger"})),(0,l.kt)("h2",{id:"handlers-definition"},"Handlers definition"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"routes/telegram.php")," should be something like this:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"<?php\n/** @var SergiX44\\Nutgram\\Nutgram $bot */\n\nuse SergiX44\\Nutgram\\Nutgram;\n\n/*\n|--------------------------------------------------------------------------\n| Nutgram Handlers\n|--------------------------------------------------------------------------\n|\n| Here is where you can register telegram handlers for Nutgram. These\n| handlers are loaded by the NutgramServiceProvider. Enjoy!\n|\n*/\n\n$bot->onCommand('start', function (Nutgram $bot) {\n    return $bot->sendMessage('Hello, world!');\n})->description('The start command!');\n")),(0,l.kt)("p",null,"This file is automatically loaded by the framework, so here is where you should define middleware, handlers and\nconversations."),(0,l.kt)("h2",{id:"mixins"},"Mixins"),(0,l.kt)("p",null,"Nutgram provides a few mixins to help you work best with Laravel."),(0,l.kt)("p",null,"Just enable the ",(0,l.kt)("inlineCode",{parentName:"p"},"mixins")," option in the ",(0,l.kt)("inlineCode",{parentName:"p"},"config/nutgram.php")," file, and you will be able to use them in your handlers."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"Nutgram")," class:"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"downloadFileToDisk(File $file, string $path, string $disk = null, array $clientOpt = []): bool"),(0,l.kt)("br",null),(0,l.kt)("em",{parentName:"li"},"Save a File to Laravel disk.")," "))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"p"},"File")," class:"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"saveToDisk(string $path, string $disk = null, array $clientOpt = []): bool"),(0,l.kt)("br",null),(0,l.kt)("em",{parentName:"li"},"Save the File to Laravel disk."))))),(0,l.kt)("h2",{id:"webhook-updates"},"Webhook updates"),(0,l.kt)("p",null,"For production mode, the webhook mode is recommended. Run the bot in that way is really simple, you should just create a\nnew controller ",(0,l.kt)("inlineCode",{parentName:"p"},"php artisan make:controller FrontController"),", and call the ",(0,l.kt)("inlineCode",{parentName:"p"},"run")," method on the bot instance:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"class FrontController extends Controller\n{\n    /**\n     * Handle the telegram webhook request.\n     */\n    public function __invoke(Nutgram $bot)\n    {\n        $bot->run();\n    }\n}\n")),(0,l.kt)("admonition",{type:"tip"},(0,l.kt)("p",{parentName:"admonition"},"When calling the ",(0,l.kt)("inlineCode",{parentName:"p"},"run()")," method on the bot instance, it automatically recognize if use the ",(0,l.kt)("inlineCode",{parentName:"p"},"Polling")," method to retrieve updates,\nor ",(0,l.kt)("inlineCode",{parentName:"p"},"Webhook"),", based on whether the current instance is running in a cli process, or is serving a web request.")),(0,l.kt)("p",null,"and remember to register it on you http routes:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"// routes/api.php\n\nRoute::post('/webhook', 'FrontController');\n")),(0,l.kt)("h2",{id:"testing"},"Testing"),(0,l.kt)("p",null,"Inside unit tests, you can automatically retrieve the ",(0,l.kt)("inlineCode",{parentName:"p"},"fake")," instance with all your handlers and middleware loaded,\nsimply by resolving it via DI:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-php"},"namespace Tests\\Feature;\n\nuse SergiX44\\Nutgram\\Nutgram;\nuse Tests\\TestCase;\n\nclass ExampleTest extends TestCase\n{\n    /**\n     * @return void\n     */\n    public function test_bot()\n    {\n        $bot = app(Nutgram::class);\n        \n        // ...\n    }\n}\n")))}m.isMDXComponent=!0}}]);