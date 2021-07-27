import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import * as Handlebars from "handlebars";
import "./chats-list-item.scss";
import { chatsListItemTmpl } from "./chats-list-item.tmpl";

Handlebars.registerHelper("numToTime", (num: number) => {
  const date = new Date(num);
  return `${date.getHours()}:${date.getMinutes()}`;
});

export type ChatsListItemProps = Props & {
  text: string;
  date: number;
  title: string;
  id: number;
};

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {
    super(props, "div", ["chat-item"]);
  }

  render(): string {
    return Handlebars.compile(chatsListItemTmpl)(this.props);
  }
}
