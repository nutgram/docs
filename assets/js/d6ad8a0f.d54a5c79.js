"use strict";(self.webpackChunknutgram_docs=self.webpackChunknutgram_docs||[]).push([[1336],{71493:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return o},default:function(){return c},frontMatter:function(){return r},metadata:function(){return d},toc:function(){return m}});var a=n(83117),i=(n(67294),n(3905));n(56022);const r={},o="From 2.x to 3.x",d={unversionedId:"upgrading/from-2.x-to-3.x",id:"version-3.x/upgrading/from-2.x-to-3.x",title:"From 2.x to 3.x",description:"The breaking changes contained in the 3.x version are all following the release 6.0 of the Telegram bot API.",source:"@site/versioned_docs/version-3.x/upgrading/from-2.x-to-3.x.md",sourceDirName:"upgrading",slug:"/upgrading/from-2.x-to-3.x",permalink:"/docs/3.x/upgrading/from-2.x-to-3.x",draft:!1,editUrl:"https://github.com/nutgram/docs/tree/master/versioned_docs/version-3.x/upgrading/from-2.x-to-3.x.md",tags:[],version:"3.x",frontMatter:{},sidebar:"docs",previous:{title:"Upgrading",permalink:"/docs/3.x/category/upgrading"},next:{title:"From 1.x to 2.x",permalink:"/docs/3.x/upgrading/from-1.x-to-2.x"}},l={},m=[{value:"Removed Methods",id:"removed-methods",level:2},{value:"Renamed Properties",id:"renamed-properties",level:2},{value:"Renamed Parameters",id:"renamed-parameters",level:2}],s={toc:m};function c(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"from-2x-to-3x"},"From 2.x to 3.x"),(0,i.kt)("p",null,"The breaking changes contained in the 3.x version are all following the release 6.0 of the Telegram bot API."),(0,i.kt)("h2",{id:"removed-methods"},"Removed Methods"),(0,i.kt)("p",null,"Telegram removed this already deprecated API calls:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getChatMembersCount")," replaced by ",(0,i.kt)("inlineCode",{parentName:"li"},"getChatMemberCount")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"kickChatMember")," replaced by ",(0,i.kt)("inlineCode",{parentName:"li"},"banChatMember"))),(0,i.kt)("h2",{id:"renamed-properties"},"Renamed Properties"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the fields ",(0,i.kt)("inlineCode",{parentName:"li"},"voice_chat_scheduled"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"voice_chat_started"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"voice_chat_ended"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"voice_chat_participants_invited")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"video_chat_scheduled"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"video_chat_started"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"video_chat_ended"),", and ",(0,i.kt)("inlineCode",{parentName:"li"},"video_chat_participants_invited")," in the class ",(0,i.kt)("inlineCode",{parentName:"li"},"Message"),"."),(0,i.kt)("li",{parentName:"ul"},"Renamed the field ",(0,i.kt)("inlineCode",{parentName:"li"},"can_manage_voice_chats")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"can_manage_video_chats")," in the class ",(0,i.kt)("inlineCode",{parentName:"li"},"ChatMemberAdministrator"))),(0,i.kt)("h2",{id:"renamed-parameters"},"Renamed Parameters"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Renamed the parameter ",(0,i.kt)("inlineCode",{parentName:"li"},"can_manage_voice_chats")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"can_manage_video_chats")," in the method ",(0,i.kt)("inlineCode",{parentName:"li"},"promoteChatMember"),".")))}c.isMDXComponent=!0}}]);