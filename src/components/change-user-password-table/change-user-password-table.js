import Handlebars from "handlebars";
import {
  changeUserPasswordTableTmpl
} from "./change-user-password-table.tmpl";


export class ChangeUserPasswordTable {
  constructor() {
    this.compiler = Handlebars.compile(changeUserPasswordTableTmpl);
  }

  compile() {
    const rows = this.generateChangeUserPasswordsRows()
    return this.compiler({
      rows
    })
  }

  generateChangeUserPasswordsRows() {
    return [{
        label: 'Старый пароль',
        key: "old-password",
      },
      {
        label: 'Новый пароль',
        key: "password",
      },
      {
        label: 'Новый пароль ещё раз',
        key: "password-verification",
      },
    ];
  }
}