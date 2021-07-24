import Handlebars from "handlebars";
import {
  signupPageTmpl
} from "./signup-page.tmpl";

export class SignupPage {
  constructor() {
    this.compiler = Handlebars.compile(signupPageTmpl);
  }

  compile() {
    return this.compiler();
  }
}