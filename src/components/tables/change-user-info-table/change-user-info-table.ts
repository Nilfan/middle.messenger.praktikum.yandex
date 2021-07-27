import { changeUserInfoTableTmpl } from "./change-user-info-table.tmpl";
import "./change-user-info-table.scss";
import * as Handlebars from "handlebars";
import Block from "../../../helpers/classes/block";
import { Props } from "../../../helpers/models/props.model";

export class ChangeUserInfoTable extends Block {
  constructor(props: Props) {
    super(props, "div");
  }

  render(): string {
    const rows = this.getFieldNames();
    return Handlebars.compile(changeUserInfoTableTmpl)({ rows });
  }

  getFieldNames() {
    return Object.keys(this.props.children);
  }
}
