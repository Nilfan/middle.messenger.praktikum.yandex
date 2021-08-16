import * as Handlebars from "handlebars";

import Block from "../../helpers/abstract-classes/block";
import { chatsListTmpl } from "./chats-list.tmpl";
import "./chats-list.scss";
import { ChatsListItem, ChatsListItemProps } from "./chats-list-item/chats-list-item";
import { AvatarImage } from "../avatar-image/avatar-image";
import { StoreFields, storeManager } from "../../services/store-manager";
import { chatsService } from "../../services/chats.service";
import { Chat } from "../../services/api/chats-api";

type Chats = ChatsListItemProps[];

export class ChatsList extends Block {
  static getChatsListFromChats(
    chats: Chats,
    activeChat: Chat
  ): {
    [key: string]: ChatsListItem;
  } {
    return chats.reduce((acc: { [key: string]: ChatsListItem }, chat, index) => {
      acc[`${ChatsListItem.name}${index}`] = new ChatsListItem({
        ...chat,
        classNames: activeChat && activeChat.id === chat.id ? ["active-chat"] : [],
        children: {
          AvatarImage: new AvatarImage({ avatarImageURL: chat.avatar }),
        },
        events: {
          click: () => {
            if (storeManager.get(StoreFields.currentChat)?.id !== chat.id) {
              chatsService.connectToChat(chat);
            }
          },
        },
      });

      return acc;
    }, {});
  }

  constructor() {
    super({ children: [], chats: [], activeChat: null }, "div");

    storeManager.subscribe(StoreFields.chats, (chats) => {
      this.setProps({
        children: ChatsList.getChatsListFromChats(chats, this.props.activeChat),
        chats,
      });
    });

    storeManager.subscribe(StoreFields.currentChat, (chat) => {
      this.setProps({ children: ChatsList.getChatsListFromChats(this.props.chats, chat) });
    });
  }

  render(): string {
    return Handlebars.compile(chatsListTmpl)({ chats: Object.keys(this.props.children) });
  }
}
