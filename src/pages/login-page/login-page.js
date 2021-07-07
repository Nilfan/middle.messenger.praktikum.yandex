import {
  loginPageTemplate
} from "./login-page.tmpl";
import Handlebars from "handlebars";

export class LoginPage {
  constructor() {
    this.template = Handlebars.compile(loginPageTemplate)
  }

  compile() {
    return this.template()
  }
}