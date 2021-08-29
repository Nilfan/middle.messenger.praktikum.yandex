import * as Handlebars from "handlebars";

import Block from "../../../helpers/abstract-classes/block";
import { Props } from "../../../helpers/models/props.model";
import { chatsListItemTmpl } from "./chats-list-item.tmpl";
import { Chat } from "../../../services/api/chats-api";
import "../../../helpers/helpers";
import "./chats-list-item.scss";

export type ChatsListItemProps = Props & Chat;

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {
    super(props, "div", ["chat-item", ...(props.classNames ?? [])]);
  }

  render(): string {
    return Handlebars.compile(chatsListItemTmpl)(this.props);
  }
}
