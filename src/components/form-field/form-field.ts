import * as Handlebars from "handlebars";

import { FormFieldProps } from "../../helpers/models/form-field.model";
import { formFieldTmpl } from "./form-field.tmpl";
import Block from "../../helpers/abstract-classes/block";
import "./form-field.scss";
import { helpers } from "../../helpers/helpers";
import { getInputValidatorMethod } from "../../helpers/validation/input-validation";

export class FormField extends Block {
  constructor(props: FormFieldProps) {
    super({}, "div", ["form-field", ...(props.classNames ?? [])]);

    if (props.validators && !helpers.isEmpty(props.validators)) {
      props.events = props.events ?? {};
      const validationMethod = getInputValidatorMethod(props.validators).bind(this);
      props.events.input = {
        ...(props.events.input ?? {}),
        focus: () => validationMethod(this),
        blur: () => validationMethod(this),
      };
    }
    this.setProps(props);

    if (props.disabled) {
      this.getInputElem().disabled = true;
    }
  }

  render(): string {
    return Handlebars.compile(formFieldTmpl)(this.props);
  }

  setDisabled(disableValue: boolean): void {
    this.getInputElem().disabled = disableValue;
  }

  validateInput(): boolean {
    const input = this.getInputElem();
    const validationMethod = getInputValidatorMethod(this.props.validators).bind(this);

    return validationMethod(input);
  }

  getInputValue(): string {
    return this.getInputElem().value;
  }

  setValue(value: string | null): void {
    this.getInputElem().value = value ? value : "";
  }

  setErrorText(errorText: string): void {
    const errorTextElem = this.getInputElem().nextElementSibling;
    if (errorTextElem) {
      errorTextElem.textContent = errorText;
    }
  }

  isInputHasClass(className: string): boolean {
    return this.getInputClassList().contains(className);
  }

  addClassName(className: string): void {
    this.getInputClassList().add(className);
  }

  deleteClassName(className: string): void {
    this.getInputClassList().remove(className);
  }

  private getInputElem(): HTMLInputElement {
    return this.getBlock().getElementsByTagName("input")[0];
  }

  private getInputClassList(): DOMTokenList {
    return this.getInputElem().classList;
  }
}
