import * as Handlebars from "handlebars";

import Block from "../../helpers/abstract-classes/block";
import { messageTableTmpl } from "./message-table.tmpl";
import "./message-table.scss";
import { StoreFields, storeManager } from "../../services/store-manager";
import { BannerComponent } from "../banner/banner";

export interface BaseMessage {
  chat_id: number;
  content: string;
  file: any;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}

export interface Message extends BaseMessage {
  userName: string;
  isCurrentUserMessage: boolean;
}

export class MessageTable extends Block {
  constructor() {
    const children = {
      Banner: new BannerComponent({ title: "Выберите чат" }),
    };

    super({ messages: [], children }, "div", ["message-table"]);

    storeManager.subscribe(StoreFields.messages, (messages: Message) => {
      console.log(messages);
      this.setProps({ messages });
    });

    storeManager.subscribe(StoreFields.currentChat, (chat) => this.setProps({ chat }));
  }

  render(): string {
    return Handlebars.compile(messageTableTmpl)(this.props);
  }
}
