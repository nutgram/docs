"use strict";(self.webpackChunknutgram_docs=self.webpackChunknutgram_docs||[]).push([[7655],{63590:function(e,t,a){a.r(t),a.d(t,{assets:function(){return l},contentTitle:function(){return o},default:function(){return u},frontMatter:function(){return r},metadata:function(){return p},toc:function(){return d}});var n=a(83117),i=(a(67294),a(3905));a(56022);const r={},o="Web Validation",p={unversionedId:"usage/web_validation",id:"usage/web_validation",title:"Web Validation",description:"Nutgram provides a simple way to validate the data received from a Login Widget or a Mini App.",source:"@site/docs/usage/web_validation.md",sourceDirName:"usage",slug:"/usage/web_validation",permalink:"/docs/usage/web_validation",draft:!1,editUrl:"https://github.com/nutgram/docs/tree/master/docs/usage/web_validation.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Bulk Messenger",permalink:"/docs/usage/bulk_messenger"},next:{title:"\u2697\ufe0f Testing",permalink:"/docs/category/\ufe0f-testing"}},l={},d=[{value:"Login Widget",id:"login-widget",level:2},{value:"Mini App",id:"mini-app",level:2}],s={toc:d};function u(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"web-validation"},"Web Validation"),(0,i.kt)("p",null,"Nutgram provides a simple way to validate the data received from a Login Widget or a Mini App."),(0,i.kt)("h2",{id:"login-widget"},"Login Widget"),(0,i.kt)("p",null,"The Telegram ",(0,i.kt)("a",{parentName:"p",href:"https://core.telegram.org/widgets/login"},"Login Widget")," is a simple way to authorize users on your website."),(0,i.kt)("p",null,"Nutgram provides the ",(0,i.kt)("inlineCode",{parentName:"p"},"validateLoginData")," method to validate the data received from the widget.",(0,i.kt)("br",null),"\nIf the data is valid, the method returns a\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/nutgram/nutgram/blob/master/src/Telegram/Web/LoginData.php"},(0,i.kt)("inlineCode",{parentName:"a"},"LoginData"))," object,\notherwise it throws an ",(0,i.kt)("inlineCode",{parentName:"p"},"InvalidDataException"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// $initData MUST BE a query string value like this: \n// id=12345678&first_name=Mario&last_name=Super&username=SuperMario&photo_url=photourl&auth_date=1693264973&hash=1a2b3c4d5e6f\n\n// Tip: you can user the http_build_query to get the query string from an array via $_POST variable.\n\ntry {\n    $loginData = $bot->validateLoginData($initData);\n    //$loginData->id\n    //$loginData->toArray()['id']\n} catch (InvalidDataException) {\n    echo 'Invalid data!';\n}\n")),(0,i.kt)("h2",{id:"mini-app"},"Mini App"),(0,i.kt)("p",null,"With ",(0,i.kt)("a",{parentName:"p",href:"https://core.telegram.org/bots/webapps"},"Mini Apps")," developers can use JavaScript to create infinitely flexible interfaces\nthat can be launched right inside Telegram \u2014 and can completely replace any website."),(0,i.kt)("p",null,"Nutgram provides the ",(0,i.kt)("inlineCode",{parentName:"p"},"validateWebAppData")," method to validate the data received from the Mini App.",(0,i.kt)("br",null),"\nIf the data is valid, the method returns a\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/nutgram/nutgram/blob/master/src/Telegram/Web/WebAppData.php"},(0,i.kt)("inlineCode",{parentName:"a"},"WebAppData"))," object,\notherwise it throws an ",(0,i.kt)("inlineCode",{parentName:"p"},"InvalidDataException"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"// $initData MUST BE a query string value like this: \n// user=%7B%22id%22%3A12345678%2C%22first_name%22%3A%22Mario%22%2C%22last_name%22%3A%22Super%22%2C%22username%22%3A%22SuperMario%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-123456789&chat_type=private&start_param=foo&auth_date=1693264973&hash=1a2b3c4d5e6f\n\n// how to get $initData from frontend (example): \n// $initData = $_GET['initData'] or $_POST['initData'];\n// initData is an example key name provided by frontend\n\ntry {\n    $webappData = $bot->validateWebAppData($initData);\n    //$webappData->user->id\n    //$webappData->toArray()['user']['id']\n} catch (InvalidDataException) {\n    echo 'Invalid data!';\n}\n")))}u.isMDXComponent=!0}}]);