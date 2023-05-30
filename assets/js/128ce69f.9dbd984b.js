"use strict";(self.webpackChunknutgram_docs=self.webpackChunknutgram_docs||[]).push([[4547],{17352:function(e,n,a){a.r(n),a.d(n,{assets:function(){return i},contentTitle:function(){return s},default:function(){return c},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return m}});var t=a(83117),r=(a(67294),a(3905)),o=a(56022);const l={sidebar_position:4},s="Middleware",d={unversionedId:"usage/middleware",id:"usage/middleware",title:"Middleware",description:"In the framework context, any handler is like a link of chain, so you can easily link together multiple handlers (",source:"@site/docs/usage/middleware.md",sourceDirName:"usage",slug:"/usage/middleware",permalink:"/docs/usage/middleware",draft:!1,editUrl:"https://github.com/nutgram/docs/tree/master/docs/usage/middleware.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"docs",previous:{title:"Handlers",permalink:"/docs/usage/handlers"},next:{title:"Keyboards",permalink:"/docs/usage/keyboards"}},i={},m=[{value:"Passing data",id:"passing-data",level:2},{value:"Before &amp; After",id:"before--after",level:2},{value:"Skipping global middlewares for a specific handler",id:"skipping-global-middlewares-for-a-specific-handler",level:2},{value:"OOP",id:"oop",level:2},{value:"Parameters",id:"parameters",level:3},{value:"Retrieve handler parameters",id:"retrieve-handler-parameters",level:2},{value:"Groups",id:"groups",level:2},{value:"Middleware",id:"middleware-1",level:3},{value:"Scope",id:"scope",level:3},{value:"Nesting groups",id:"nesting-groups",level:3},{value:"Flow",id:"flow",level:2}],u={toc:m};function c(e){let{components:n,...a}=e;return(0,r.kt)("wrapper",(0,t.Z)({},u,a,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"middleware"},"Middleware"),(0,r.kt)("p",null,"In the framework context, any handler is like a ",(0,r.kt)("strong",{parentName:"p"},"link of chain"),", so you can easily link together multiple handlers (\nmiddlewares). It applies the same concept that frameworks like Laravel have, allowing you to leverage them to separate\nrepeated logic, or perform checks before executing a message handler."),(0,r.kt)("p",null,"The best explanation comes from the Laravel documentation:"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},'It\'s best to envision middleware as a series of "layers" HTTP requests must pass through before they hit your\napplication. Each layer can examine the request and even reject it entirely.')),(0,r.kt)("p",null,"Where you can replace the HTTP requests with an incoming update from Telegram."),(0,r.kt)("p",null,"Let's see an example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n// global middleware\n$bot->middleware(function (Nutgram $bot, $next) {\n    $bot->sendMessage('I\\'m the global middleware!!');\n    $next($bot);\n});\n\n$bot->onMessage(function (Nutgram $bot) {\n    $bot->sendMessage('I\\'m the message handler!!');\n})->middleware(function (Nutgram $bot, $next) {\n\n    $bot->sendMessage('I\\'m the specific middleware!!');\n    $next($bot);\n});\n\n$bot->run();\n")),(0,r.kt)("p",null,"In the example above, the sequence of the calls is"),(0,r.kt)(o.G,{chart:"graph LR\n    global_middleware--\x3especific_middleware\n    specific_middleware--\x3emessage_handler",mdxType:"Mermaid"}),(0,r.kt)("p",null,"As the name says, the ",(0,r.kt)("inlineCode",{parentName:"p"},"global middleware")," will be called before ",(0,r.kt)("em",{parentName:"p"},"every")," message middleware of every handler (or before\nevery handler if no middleware specified). The ",(0,r.kt)("inlineCode",{parentName:"p"},"specific middleware")," will be called only before the ",(0,r.kt)("inlineCode",{parentName:"p"},"message handler"),"."),(0,r.kt)("p",null,"The call to ",(0,r.kt)("inlineCode",{parentName:"p"},"$next($bot)")," is needed to proceed through the chain, where ",(0,r.kt)("inlineCode",{parentName:"p"},"$next")," is the next callable, passing the\ncurrent instance of the bot. It is possible at any point to stop the execution of the chain, returning from the\nfunction, or not calling the method ",(0,r.kt)("inlineCode",{parentName:"p"},"$next($bot)"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n$bot->onMessage(function (Nutgram $bot) {\n    $bot->sendMessage('I will be never called :(');\n})->middleware(function (Nutgram $bot, $next) {\n\n    $bot->sendMessage('Stop!');\n    //$next($bot);\n});\n\n$bot->run();\n")),(0,r.kt)("h2",{id:"passing-data"},"Passing data"),(0,r.kt)("p",null,"It's possible to pass data between middlewares, using the method ",(0,r.kt)("inlineCode",{parentName:"p"},"set")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"get")," on the bot instance, for\nexample, to automatically retrieve data from a database, perform checks, and so on:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n// retrieve the user\n$bot->middleware(function (Nutgram $bot, $next) {\n    $user = get_current_user_from_db($bot->userId());\n    $bot->set('user', $user);\n    $next($bot);\n});\n\n\n$bot->onCommand('admin', function (Nutgram $bot) {\n\n    $user = $bot->get('user');\n    $bot->sendMessage(\"Hi admin $user->name!\");\n    \n})->middleware(function (Nutgram $bot, $next) {\n\n    $user = $bot->get('user'); // retrieve the user we have set in the global middleware\n    if ($user->isAdmin) { // if the user is an admin, continue the chain\n        $next($bot);\n    }\n    $bot->sendMessage('You are not an admin >:(');\n});\n\n$bot->onCommand('user', function (Nutgram $bot) {\n    $user = $bot->get('user');\n    $bot->sendMessage(\"Hi user $user->name!\");\n});\n\n$bot->run();\n")),(0,r.kt)("h2",{id:"before--after"},"Before & After"),(0,r.kt)("p",null,"The model allow you to perform actions before and after the chain executed:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n// global middleware\n$bot->middleware(function (Nutgram $bot, $next) {\n\n    // do something before the handlers\n    \n    $next($bot); // sends \"Hi!\"\n    \n    // do something\n});\n\n$bot->onMessage(function (Nutgram $bot) {\n    $bot->sendMessage('Hi!');\n});\n\n$bot->run();\n\n")),(0,r.kt)("h2",{id:"skipping-global-middlewares-for-a-specific-handler"},"Skipping global middlewares for a specific handler"),(0,r.kt)("p",null,"If you want to skip the global middlewares for a specific handler, you can use the method ",(0,r.kt)("inlineCode",{parentName:"p"},"skipGlobalMiddlewares()"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n// global middlewares\n$bot->middleware(GlobalMiddlewareA::class);\n$bot->middleware(GlobalMiddlewareB::class);\n\n// handler that skips global middlewares\n$bot\n    ->onMessage(SendHelloHandler::class)\n    ->skipGlobalMiddlewares();\n\n// handler that skips some global middlewares\n$bot\n    ->onCommand('secret'::class)\n    ->skipGlobalMiddlewares([\n        GlobalMiddlewareB::class\n    ]);\n\n$bot->run();\n\n")),(0,r.kt)("h2",{id:"oop"},"OOP"),(0,r.kt)("p",null,"Also in this case, all the ",(0,r.kt)("inlineCode",{parentName:"p"},"$callable")," can be also defined as class-method or invokable class:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\nclass MyMiddleware {\n\n    public function __invoke(Nutgram $bot, $next) \n    {\n      //do stuff\n      $next($bot);\n    }\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\nclass MyCommand {\n\n    public function __invoke(Nutgram $bot, $param) \n    {\n      //do stuff\n    }\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n$bot->onCommand('start {param}', MyCommand::class)\n    ->middleware(MyMiddleware::class);\n\n$bot->run();\n")),(0,r.kt)("h3",{id:"parameters"},"Parameters"),(0,r.kt)("p",null,"You can pass parameters to the middlewares, just using the class constructor:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"\nuse SergiX44\\Nutgram\\Nutgram;\nuse App\\Telegram\\Commands\\AddChannelCommand;\nuse App\\Telegram\\Commands\\AddImageCommand;\nuse App\\Telegram\\Middleware\\CheckUserPermission;\n\nclass CheckUserPermission \n{\n    protected string $permission;\n    \n    public function __construct(string $permission)\n    {\n        $this->permission = $permission;\n    }\n    \n    public function __invoke(Nutgram $bot, $next): void\n    {\n        //check if user has permssion using $this->permission\n\n        $next($bot);\n    }\n}\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n$bot->onCommand('add_channel', AddChannelCommand::class)\n    ->middleware(new CheckUserPermission('can_add_channel'));\n\n$bot->onCommand('add_image', AddImageCommand::class)\n    ->middleware(new CheckUserPermission('can_add_image'));\n\n$bot->run();\n")),(0,r.kt)("h2",{id:"retrieve-handler-parameters"},"Retrieve handler parameters"),(0,r.kt)("p",null,"The framework provides the ",(0,r.kt)("inlineCode",{parentName:"p"},"currentParameters")," method allowing you to obtain the parameters of the target handler.\nYou can use this method in any context of the code, not just within middleware."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"currentParameters")," method returns an ",(0,r.kt)("inlineCode",{parentName:"p"},"array")," containing the parameters of the target handler.\nIn your code, you can use the array returned by the method to access the handler's parameters."),(0,r.kt)("p",null,"Use case:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"$bot = new Nutgram('TOKEN');\n\n$bot->group(function(Nutgram $bot){\n    $bot->onCallbackQueryData('user/([0-9]+)/show', [UserController::class, 'show']);\n    $bot->onCallbackQueryData('user/([0-9]+)/edit', [UserController::class, 'edit']);\n    $bot->onCallbackQueryData('user/([0-9]+)/delete', [UserController::class, 'delete']);\n})->middleware(CheckUserMiddleware::class);\n\n$bot->run();\n")),(0,r.kt)("p",null,"Without the ",(0,r.kt)("inlineCode",{parentName:"p"},"currentParameters")," method, you would have to write the following code:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class CheckUserMiddleware\n{\n    public function __invoke(Nutgram $bot, $next)\n    {\n        preg_match('/user\\/([0-9]+)\\/.*/', $bot->callbackQuery()->data, $matches);\n        $id = $matches[1];\n        // check user by $id\n        $next($bot);\n    }\n}\n")),(0,r.kt)("p",null,"With the ",(0,r.kt)("inlineCode",{parentName:"p"},"currentParameters")," method, you can write the following code:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"class CheckUserMiddleware\n{\n    public function __invoke(Nutgram $bot, $next)\n    {\n        [$id] = $bot->currentParameters();\n        // check user by $id\n        $next($bot);\n    }\n}\n")),(0,r.kt)("h2",{id:"groups"},"Groups"),(0,r.kt)("h3",{id:"middleware-1"},"Middleware"),(0,r.kt)("p",null,"You can group middlewares, using the ",(0,r.kt)("inlineCode",{parentName:"p"},"group")," method:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"// before:\n$bot->onCommand('start', StartCommand::class);\n$bot->onCommand('help', HelpCommand::class);\n\n$bot->onCommand('mute', MuteCommand::class)->middleware(IsAdmin::class);\n$bot->onCommand('kick', KickCommand::class)->middleware(IsAdmin::class);\n$bot->onCommand('ban', BanCommand::class)->middleware(IsAdmin::class);\n$bot->onCommand('unban', UnbanCommand::class)->middleware(IsAdmin::class);\n\n// after:\n$bot->onCommand('start', StartCommand::class);\n$bot->onCommand('help', HelpCommand::class);\n\n$bot->group(function (Nutgram $bot){\n    $bot->onCommand('mute', MuteCommand::class);\n    $bot->onCommand('kick', KickCommand::class);\n    $bot->onCommand('ban', BanCommand::class);\n    $bot->onCommand('unban', UnbanCommand::class);\n})->middleware(IsAdmin::class);\n")),(0,r.kt)("h3",{id:"scope"},"Scope"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"scope()")," method allows you to define the visibility of commands within a specific chat context."),(0,r.kt)("p",null,"In the provided code snippet, ",(0,r.kt)("inlineCode",{parentName:"p"},"scope(new BotCommandScopeAllPrivateChats())"),"\nrestricts the grouped commands to be visible only in private chat conversations with individual users."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\nuse SergiX44\\Nutgram\\Telegram\\Types\\Command\\BotCommandScopeAllPrivateChats;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n$bot->onCommand('start', function (Nutgram $bot) {\n    //\n})->description('Start command');\n\n$bot->group(function (Nutgram $bot) {\n    $bot->onCommand('private', function (Nutgram $bot) { \n        //\n    })->description('A command visible just in a private chat');    \n    \n    $bot->onCommand('private2', function (Nutgram $bot) { \n        //\n    })->description('Another command visible just in a private chat');\n})->scope(new BotCommandScopeAllPrivateChats());\n\n$bot->run();\n")),(0,r.kt)("p",null,"For all the available scopes, checkout the ",(0,r.kt)("a",{parentName:"p",href:"https://core.telegram.org/bots/api#botcommandscope"},"Telegram official doc"),"."),(0,r.kt)("h3",{id:"nesting-groups"},"Nesting groups"),(0,r.kt)("p",null,"It's also possible to create nested groups"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"// single middleware\n$bot->group(function (Nutgram $bot){\n    // Your handlers here\n})->middleware(Middleware::class);\n\n// multiple middlewares\n$bot->group(function (Nutgram $bot){\n    // Your handlers here\n})\n->middleware(Middleware1::class)\n->middleware(Middleware2::class);\n\n// nested middlewares\n$bot->group(function (Nutgram $bot){\n    // Your handlers here\n\n    $bot->group(function (Nutgram $bot){\n        // Your handlers here\n    })->scope(/* */)->middleware(Middleware2::class);\n    \n})->middleware(Middleware1::class)->scope(/* */);\n")),(0,r.kt)("h2",{id:"flow"},"Flow"),(0,r.kt)("p",null,"The global middlewares are executed in descending order.\nThe handlers middlewares are executed in ",(0,r.kt)("strong",{parentName:"p"},"ascending")," order."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram('TOKEN');\n\n$bot->middleware(MiddlewareA::class);                   // 1\xb0\n$bot->middleware(MiddlewareB::class);                   // 2\xb0\n\n$bot->group(function (Nutgram $bot) {\n    $bot->group(function (Nutgram $bot) {\n        $bot->onCommand('start', StartCommand::class)   // 8\xb0\n             ->middleware(MiddlewareF::class)           // 7\xb0\n             ->middleware(MiddlewareG::class);          // 6\xb0\n    })->middleware(MiddlewareE::class);                 // 5\xb0\n})\n->middleware(MiddlewareC::class)                        // 3\xb0\n->middleware(MiddlewareD::class);                       // 4\xb0\n\n$bot->run();\n")),(0,r.kt)("p",null,"In the example above, the sequence of the calls is"),(0,r.kt)(o.G,{chart:"graph LR\n    MiddlewareA--\x3eMiddlewareB\n    MiddlewareB--\x3eMiddlewareC\n    MiddlewareC--\x3eMiddlewareD\n    MiddlewareD--\x3eMiddlewareE\n    MiddlewareE--\x3eMiddlewareG\n    MiddlewareG--\x3eMiddlewareF",mdxType:"Mermaid"}))}c.isMDXComponent=!0}}]);