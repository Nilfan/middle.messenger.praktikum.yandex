import * as Handlebars from "handlebars";

import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import { chatsListTmpl } from "./chats-list.tmpl";
import "./chats-list.scss";
import { ChatsListItem, ChatsListItemProps } from "../chats-list-item/chats-list-item";
import { AvatarImage, AvatarImageProps } from "../avatar-image/avatar-image";

type Chats = (ChatsListItemProps & AvatarImageProps)[];

export class ChatsList extends Block {
  static getChatsListFromChats(chatItemPropsList: Chats): {
    [key: string]: ChatsListItem;
  } {
    return chatItemPropsList.reduce((acc: { [key: string]: ChatsListItem }, props, index) => {
      acc[`${ChatsListItem.name}${index}`] = new ChatsListItem({
        ...props,
        children: {
          AvatarImage: new AvatarImage({ avatarImageURL: props.avatarImageURL }),
        },
      });

      return acc;
    }, {});
  }

  constructor(props: Props & { chats: Chats }) {
    props.children = { ...(props.children ?? {}), ...ChatsList.getChatsListFromChats(props.chats) };
    super(props, "div");
  }

  render(): string {
    return Handlebars.compile(chatsListTmpl)({ chats: this.getChatsNames() });
  }

  private getChatsNames() {
    return Object.keys(this.props.children);
  }
}
