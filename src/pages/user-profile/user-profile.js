import {
  userProfileTmpl
} from "./user-profile.tmpl";
import Handlebars from "handlebars";

export class UserProfilePage {
  constructor() {
    this.compiler = Handlebars.compile(userProfileTmpl)
  }

  compile(ctx) {

    const raws = this.generateUserInfoRows(ctx)
    return this.compiler({
      raws,
      avatarImageURL: ctx.avatarImageURL
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