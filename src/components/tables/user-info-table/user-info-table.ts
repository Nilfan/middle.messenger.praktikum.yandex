import * as Handlebars from "handlebars";

import Block, { ComponentChildren } from "../../../helpers/abstract-classes/block";
import { StoreFields, storeManager } from "../../../services/store-manager";
import { UserInfo } from "../../../helpers/models/user.model";
import { authService } from "../../../services/auth.service";
import { Button } from "../../button/button";
import { userInfoTableTmpl } from "./user-info-table.tmpl";
import "./user-info-table.scss";

export class UserInfoTable extends Block {
  constructor() {
    const children = UserInfoTable.getChildren();
    super({ children }, "div", ["custom-table"]);

    storeManager.subscribe(StoreFields.user, (user) => {
      if (user) {
        this.setProps(user);
      }
    });
  }

  render(): string {
    const rows = this.generateUserInfoRows(this.props as UserInfo);
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
    display_name = "n/a",
  }: UserInfo): { key: string; value: string }[] {
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
        key: "Имя в чатах",
        value: display_name,
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
