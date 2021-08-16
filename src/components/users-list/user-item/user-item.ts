import * as Handlebars from "handlebars";
import Block from "../../../helpers/abstract-classes/block";
import { Props } from "../../../helpers/models/props.model";
import { userItemTmpl } from "./user-item.tmpl";
import "./user-item.scss";
import { User } from "../../../helpers/models/user.model";

export interface UserItemProps extends Props {
  user: User;
}

export class UserItem extends Block {
  constructor(props: UserItemProps) {
    super(props, "div", ["user-item"]);
  }
  render(): string {
    return Handlebars.compile(userItemTmpl)(this.props);
  }
}
