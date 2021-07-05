import {
  userProfileTmpl
} from "./user-profile.tmpl";
import Handlebars from "handlebars";

export class UserProfilePage {
  constructor() {
    this.compiler = Handlebars.compile(userProfileTmpl)
  }

  compile({
    email,
    userName,
    firstName = 'n/a',
    lastName = 'n/a',
    chatName,
    phone = 'n/a',
  }) {
    return this.compiler(email,
      userName,
      firstName,
      lastName,
      chatName,
      phone, )
  }
}