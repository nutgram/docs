"use strict";(self.webpackChunknutgram_docs=self.webpackChunknutgram_docs||[]).push([[2799],{43563:function(e,t,n){n.r(t),n.d(t,{assets:function(){return o},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return r},metadata:function(){return l},toc:function(){return u}});var a=n(83117),s=(n(67294),n(3905));n(56022);const r={},i="Bulk Messenger",l={unversionedId:"usage/bulk_messenger",id:"version-3.x/usage/bulk_messenger",title:"Bulk Messenger",description:"This feature is experimental and it may change in the future.",source:"@site/versioned_docs/version-3.x/usage/bulk_messenger.md",sourceDirName:"usage",slug:"/usage/bulk_messenger",permalink:"/docs/3.x/usage/bulk_messenger",draft:!1,editUrl:"https://github.com/nutgram/docs/tree/master/versioned_docs/version-3.x/usage/bulk_messenger.md",tags:[],version:"3.x",frontMatter:{},sidebar:"docs",previous:{title:"Extend",permalink:"/docs/3.x/usage/extend"},next:{title:"Testing",permalink:"/docs/3.x/category/testing"}},o={},u=[{value:"Methods",id:"methods",level:2},{value:"Usage",id:"usage",level:2}],d={toc:u};function m(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"bulk-messenger"},"Bulk Messenger"),(0,s.kt)("admonition",{type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"This feature is ",(0,s.kt)("strong",{parentName:"p"},"experimental")," and it may change in the future.")),(0,s.kt)("p",null,"Bulk Messenger is a tool that lets you automatically send Telegram Messages to a list of Chats."),(0,s.kt)("h2",{id:"methods"},"Methods"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"using(callable $action)")," - Executes the given action with the current instance of the Bulk Messenger.",(0,s.kt)("br",null),"\nDefault:",(0,s.kt)("pre",{parentName:"li"},(0,s.kt)("code",{parentName:"pre",className:"language-php"},"function (Nutgram $bot, int $chatId) {\n    $bot->sendMessage($this->text, array_merge($this->opt, ['chat_id' => $chatId]));\n};\n"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"setChats(array $chats)")," - Sets the chats to send the message to.",(0,s.kt)("br",null),"\nDefault: ",(0,s.kt)("inlineCode",{parentName:"li"},"[]")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"setInterval(int $seconds)")," - Sets the interval between each message.",(0,s.kt)("br",null),"\nDefault: ",(0,s.kt)("inlineCode",{parentName:"li"},"2")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"setText(string $text)")," - Sets the text of the message.",(0,s.kt)("br",null),"\nDefault: ",(0,s.kt)("inlineCode",{parentName:"li"},"'Hello!'")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"setOpt(array $params)")," - Sets the parameters of the message.",(0,s.kt)("br",null),"\nDefault: ",(0,s.kt)("inlineCode",{parentName:"li"},"[]")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"startAsync()")," - Starts the sending process in the background.",(0,s.kt)("br",null),"\nSupported OS: ",(0,s.kt)("inlineCode",{parentName:"li"},"Linux"),", ",(0,s.kt)("inlineCode",{parentName:"li"},"MacOS"),"."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"startSync()")," - Starts the sending process in the foreground.",(0,s.kt)("br",null),"\nSupported OS: ",(0,s.kt)("inlineCode",{parentName:"li"},"Linux"),", ",(0,s.kt)("inlineCode",{parentName:"li"},"Windows"),", ",(0,s.kt)("inlineCode",{parentName:"li"},"MacOS"),".")),(0,s.kt)("h2",{id:"usage"},"Usage"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-php"},"use SergiX44\\Nutgram\\Nutgram;\n\n$bot = new Nutgram($_ENV['TOKEN']);\n\n$chats = [];\n\n// Using the default sendMessage method ***************************************\n\n// in scripts\n$bot->getBulkMessenger()\n    ->setChats($chats)\n    ->setText('Hello!')\n    ->setOpt([/* optional parameters */])\n    ->startSync()\n\n// inside handlers (polling)\n$bot->onCommand('start', function (Nutgram $bot) use ($chats) {\n    $bot->getBulkMessenger()\n        ->setChats($chats)\n        ->setText('Hello!')\n        ->setOpt([/* optional parameters */])\n        ->startAsync();\n});\n$bot->run();\n\n// Using a custom method ******************************************************\n\n// in scripts\n$bot->getBulkMessenger()\n    ->setChats($chats)\n    ->using(fn (Nutgram $bot, int $chatId) => $bot->sendDocument($document, ['chat_id' => $chatId]))\n    ->startSync();\n\n// inside handlers (polling)\n$bot->onCommand('start', function (Nutgram $bot) use ($document, $chats) {\n    $bot->getBulkMessenger()\n        ->setChats($chats)\n        ->using(fn (Nutgram $bot, int $chatId) => $bot->sendDocument($document, ['chat_id' => $chatId]))\n        ->startAsync();\n});\n$bot->run();\n\n")))}m.isMDXComponent=!0}}]);