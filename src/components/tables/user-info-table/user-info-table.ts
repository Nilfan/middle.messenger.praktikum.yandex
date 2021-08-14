import * as Handlebars from "handlebars";

import Block, { ComponentChildren } from "../../../helpers/classes/block";
import { storeManager } from "../../../helpers/classes/store";
import { authService } from "../../../services/auth-service";
import { Button } from "../../button/button";
import { userInfoTableTmpl } from "./user-info-table.tmpl";

export interface UserInfoTableProps {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  chatName: string;
}

export class UserInfoTable extends Block {
  userInfo: any;

  constructor() {
    const children = UserInfoTable.getChildren();
    super({ children }, "div", ["custom-table"]);

    storeManager.subscribe("user", (user) => {
      this.setProps(user);
    });

    authService.getUser();

    console.log(storeManager.store);
  }

  render(): string {
    const rows = this.generateUserInfoRows(this.props as UserInfoTableProps);
    return Handlebars.compile(userInfoTableTmpl)({
      rows,
    });
  }

  generateUserInfoRows({
    email,
    login,
    first_name = "n/a",
    second_name = "n/a",
    phone = "n/a",
  }: UserInfoTableProps): { key: string; value: string }[] {
    return [
      {
        key: "Почта",
        value: email,
      },
      {
        key: "Логин",
        value: login,
      },
      {
        key: "Имя",
        value: first_name,
      },
      {
        key: "Фамилия",
        value: second_name,
      },
      {
        key: "Телефон",
        value: phone,
      },
    ];
  }

  static getChildren(): ComponentChildren {
    return {
      LeaveButton: new Button(
        {
          label: "Выйти",
          events: {
            click: () => authService.logout(),
          },
        },
        ["btn", "btn-warning", "btn_left"]
      ),
    };
  }
}
