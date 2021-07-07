import Handlebars from "handlebars";
import {
  signinPageTmpl
} from "./signin-page.tmpl";

export class SigninPage {
  constructor() {
    this.template = Handlebars.compile(signinPageTmpl);
  }

  compile() {
    return this.template();
  }
}