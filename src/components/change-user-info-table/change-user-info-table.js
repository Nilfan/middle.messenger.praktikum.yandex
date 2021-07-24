import Handlebars from "handlebars";
import {
  changeUserInfoTableTmpl
} from "./change-user-info-table.tmpl";


export class ChangeUserInfoTable {
  constructor() {
    this.compiler = Handlebars.compile(changeUserInfoTableTmpl);
  }

  compile(ctx) {
    const rows = this.generateChangeUserInfoRows(ctx)
    return this.compiler({
      rows
    })
  }

  generateChangeUserInfoRows({
    email,
    userName,
    firstName = 'n/a',
    lastName = 'n/a',
    phone = 'n/a',
  }) {
    return [{
        label: 'Почта',
        key: "email",
        value: email
      },
      {
        label: 'Логин',
        key: "userName",
        value: userName
      },
      {
        label: 'Имя',
        key: "firstName",
        value: firstName
      },
      {
        label: 'Фамилия',
        key: "lastName",
        value: lastName
      },
      {
        label: 'Телефон',
        key: "phone",
        value: phone
      },
    ];
  }
}