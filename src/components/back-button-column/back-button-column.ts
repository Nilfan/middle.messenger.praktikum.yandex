import Block from "../../helpers/classes/block";
import { backButtonColumnTmpl } from "./back-button-column.tmpl";
import * as Handlebars from "handlebars";
import "./back-button-column.scss";

export class BackButtonColumn extends Block {
  constructor(props: { backLink: string }) {
    super(props, "div", ["center-layout", "back-button-column"]);
  }

  render(): string {
    return Handlebars.compile(backButtonColumnTmpl)(this.props);
  }
}
