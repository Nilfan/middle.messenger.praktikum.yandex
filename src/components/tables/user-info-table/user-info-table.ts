import * as Handlebars from "handlebars";

import Block from "../../../helpers/classes/block";
import { Props } from "../../../helpers/models/props.model";
import { userInfoTableTmpl } from "./user-info-table.tmpl";

export interface UserInfoTableProps {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  chatName: string;
}

export class UserInfoTable extends Block {
  constructor(props: Props & UserInfoTableProps) {
    super(props, "div", ["custom-table"]);
  }

  render(): string {
    const rows = this.generateUserInfoRows(this.props as UserInfoTableProps);
    return Handlebars.compile(userInfoTableTmpl)({
      rows,
    });
  }

  generateUserInfoRows({
    email,
    userName,
    firstName = "n/a",
    lastName = "n/a",
    phone = "n/a",
  }: UserInfoTableProps) {
    return [
      {
        key: "Почта",
        value: email,
      },
      {
        key: "Логин",
        value: userName,
      },
      {
        key: "Имя",
        value: firstName,
      },
      {
        key: "Фамилия",
        value: lastName,
      },
      {
        key: "Телефон",
        value: phone,
      },
    ];
  }
}
