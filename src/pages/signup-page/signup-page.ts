import * as Handlebars from "handlebars";
import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import { signupPageTmpl } from "./signup-page.tmpl";
import "./signup-page.scss";

export class SignupPage extends Block {
  constructor(props: Props) {
    super(props, "div", ["center-layout"]);
  }

  render() {
    return Handlebars.compile(signupPageTmpl)(this.props);
  }
}
