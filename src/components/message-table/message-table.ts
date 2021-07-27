import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import * as Handlebars from "handlebars";
import { messageTableTmpl } from "./message-table.tmpl";
import "./message-table.scss";

export interface Message {
  userId: number;
  username: string;
  date: number;
  text: string;
}

export type MessageTableProps = Props & { currentUserId: number; messages: Message[] };

export class MessageTable extends Block {
  constructor(props: MessageTableProps) {
    props.messages = props.messages.map((message) => ({
      ...message,
      currentUserMessage: message.userId === props.currentUserId,
    }));
    super(props);
  }

  render(): string {
    return Handlebars.compile(messageTableTmpl)(this.props);
  }
}
