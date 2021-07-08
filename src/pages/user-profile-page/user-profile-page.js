import {
  userProfilePageTmpl,
} from "./user-profile-page.tmpl";
import Handlebars from "handlebars";

export class UserProfilePage {
  constructor() {
    this.compiler = Handlebars.compile(userProfilePageTmpl)
  }

  compile(ctx) {
    return this.compiler(ctx)
  }

}