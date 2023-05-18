
# From 2.x to 3.x

The breaking changes contained in the 3.x version are all following the release 6.0 of the Telegram bot API.

## Removed Methods

Telegram removed this already deprecated API calls:

- `getChatMembersCount` replaced by `getChatMemberCount`
- `kickChatMember` replaced by `banChatMember`

## Renamed Properties

- Renamed the fields `voice_chat_scheduled`, `voice_chat_started`, `voice_chat_ended`, and `voice_chat_participants_invited` to `video_chat_scheduled`, `video_chat_started`, `video_chat_ended`, and `video_chat_participants_invited` in the class `Message`.
- Renamed the field `can_manage_voice_chats` to `can_manage_video_chats` in the class `ChatMemberAdministrator`

## Renamed Parameters

- Renamed the parameter `can_manage_voice_chats` to `can_manage_video_chats` in the method `promoteChatMember`.