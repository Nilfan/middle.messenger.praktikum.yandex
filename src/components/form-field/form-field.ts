import * as Handlebars from "handlebars";

import { FormFieldProps } from "../../helpers/models/form-field.model";
import { formFieldTmpl } from "./form-field.tmpl";
import { Props } from "../../helpers/models/props.model";
import Block from "../../helpers/classes/block";
import "./form-field.scss";
import { helpers } from "../../helpers/helpers";
import { Validator } from "../../helpers/models/input-validator.model";
import { getInputValidatorMethod } from "../../helpers/validation/input-validation";

export class FormField extends Block {
  constructor(props: FormFieldProps & Props) {
    if (props.validators && !helpers.isEmpty(props.validators)) {
      props.events = props.events ?? {};
      const validationMethod = getInputValidatorMethod(props.validators);
      props.events.input = {
        ...(props.events.input ?? {}),
        focus: (event: FocusEvent) => validationMethod(event.target),
        blur: (event: FocusEvent) => validationMethod(event.target),
      };
    }

    super(props, "div", ["form-field"]);
  }

  render(): string {
    return Handlebars.compile(formFieldTmpl)(this.props);
  }

  validateInput(): boolean {
    const input = this.getContent().getElementsByTagName("input")[0];
    const validationMethod = getInputValidatorMethod(this.props.validators);

    return validationMethod(input);
  }
}
