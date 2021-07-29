import * as Handlebars from "handlebars";
import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import { messengerTmpl } from "./messenger-page.tmpl";
import "./messenger-page.scss";

export interface MessengerPageProps {
  activeChatTitle: string | null;
}

export class MessengerPage extends Block {
  constructor(props: Props) {
    super(props, "main", ["page-content-container"]);
  }

  render(): string {
    return Handlebars.compile(messengerTmpl)(this.props);
  }
}
