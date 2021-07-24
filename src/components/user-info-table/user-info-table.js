import Handlebars from "handlebars";
import {
  userInfoTableTmpl
} from "./user-info-table.tmpl";


export class UserInfoTable {
  constructor() {
    this.compiler = Handlebars.compile(userInfoTableTmpl);
  }

  compile(ctx) {
    const rows = this.generateUserInfoRows(ctx)
    return this.compiler({
      rows
    })
  }

  generateUserInfoRows({
    email,
    userName,
    firstName = 'n/a',
    lastName = 'n/a',
    phone = 'n/a',
  }) {
    return [{
        key: 'Почта',
        value: email
      },
      {
        key: 'Логин',
        value: userName
      },
      {
        key: 'Имя',
        value: firstName
      },
      {
        key: 'Фамилия',
        value: lastName
      },
      {
        key: 'Телефон',
        value: phone
      },
    ];
  }
}