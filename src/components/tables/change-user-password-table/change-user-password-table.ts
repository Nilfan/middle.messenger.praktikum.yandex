import * as Handlebars from "handlebars";

import Block from "../../../helpers/classes/block";
import { Props } from "../../../helpers/models/props.model";
import { changeUserPasswordTableTmpl } from "./change-user-password-table.tmpl";

export class ChangeUserPasswordTable extends Block {
  constructor(props: Props) {
    super(props, "div");
  }

  render(): string {
    const rows = this.getFieldNames();
    return Handlebars.compile(changeUserPasswordTableTmpl)({ rows });
  }

  getFieldNames() {
    return Object.keys(this.props.children);
  }
}
