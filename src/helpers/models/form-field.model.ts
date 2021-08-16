import { InputValidatorOptions } from "./input-validator.model";
import { Props } from "./props.model";

export enum InputType {
  button = "button",
  checkbox = "checkbox",
  color = "color",
  date = "date",
  datetimeLocal = "datetime-local",
  email = "email",
  file = "file",
  hidden = "hidden",
  image = "image",
  month = "month",
  number = "number",
  password = "password",
  radio = "radio",
  range = "range",
  reset = "reset",
  search = "search",
  submit = "submit",
  tel = "tel",
  text = "text",
  time = "time",
  url = "url",
  week = "week",
}

export interface FormFieldProps extends Props {
  name: string;
  placeholder?: string;
  label: string;
  errorText?: string;
  type?: InputType;
  value?: string;
  validators?: InputValidatorOptions;
  disabled?: boolean;
}
