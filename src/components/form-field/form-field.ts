import { formFieldTmpl } from "./form-field.tmpl";
import * as Handlebars from "handlebars";
import { Props } from "../../helpers/models/props.model";
import Block from "../../helpers/classes/block";
import { FormFieldProps } from "../../helpers/models/form-field.model";
import "./form-field.scss";

export class FormField extends Block {
  constructor(props: FormFieldProps & Props) {
    super(props, "div", ["form-field"]);
  }

  render(): string {
    return Handlebars.compile(formFieldTmpl)(this.props);
  }
}
