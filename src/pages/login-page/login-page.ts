import { loginPageTemplate } from "./login-page.tmpl";
import * as Handlebars from "handlebars";
import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import "./login-page.scss";

export class LoginPage extends Block {
  constructor(props: Props) {
    super(props, "div", ["center-layout"]);
  }

  render() {
    return Handlebars.compile(loginPageTemplate)(this.props);
  }
}
