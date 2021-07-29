import { errorPageTemplate } from "./error-page.tmpl";
import * as Handlebars from "handlebars";
import { Props } from "../../helpers/models/props.model";
import Block from "../../helpers/classes/block";
import "./error-page.scss";

type ErrorPageContext = Props & {
  code: string;
  text: string;
  buttonText: string;
};

export class ErrorPage extends Block {
  constructor(props: ErrorPageContext) {
    super(props, "div", ["center-layout"]);
  }

  render(): string {
    return Handlebars.compile(errorPageTemplate)(this.props);
  }
}
