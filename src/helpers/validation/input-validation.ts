import { FormField } from "../../components/form-field/form-field";
import { helpers } from "../helpers";
import { InputType } from "../models/form-field.model";
import { InputValidatorOptions, Validators } from "../models/input-validator.model";

const INVALID_CLASS = "invalid";

export const InputValidationPattern = {
  email: /.+@.+\..+/i,
  phone: /(\+7|7|8)+([0-9]){10}$/i,
};

export enum InputValidatorName {
  required = "required",
  pattern = "pattern",
  minLength = "minLength",
  maxLength = "maxLength",
}

export function getInputValidatorMethod(
  validatorsOptions: InputValidatorOptions
): (element: EventTarget | null | HTMLInputElement) => boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentValidators: ((...args: any) => boolean)[] = [];

  if (!helpers.isEmpty(validatorsOptions)) {
    Object.entries(validatorsOptions).forEach(([name, option]) => {
      componentValidators.push(inputValidators[name](option));
    });
  }

  return function () {
    return helpers.isEmpty(componentValidators)
      ? true
      : componentValidators.map((validator) => validator(this)).some((valid) => !!valid);
  };
}

const inputValidators: Validators = {
  required:
    () =>
    (formField: FormField): boolean => {
      const value = formField.getInputValue();

      switch (formField.props.type) {
        case InputType.password:
        case InputType.text:
          if (!value && !formField.isInputHasClass(INVALID_CLASS)) {
            formField.addClassName(INVALID_CLASS);
            formField.setErrorText("Поле не должно быть пустым");
          } else if (!!value && formField.isInputHasClass(INVALID_CLASS)) {
            formField.deleteClassName(INVALID_CLASS);
            formField.setErrorText("");
          }
          break;
      }

      return !formField.isInputHasClass(INVALID_CLASS);
    },

  pattern:
    (pattern: string) =>
    (formField: FormField): boolean => {
      const value = formField.getInputValue() || "";

      if (!value.match(pattern) && !formField.isInputHasClass(INVALID_CLASS)) {
        formField.addClassName(INVALID_CLASS);
        formField.setErrorText("Неверное значение поля");
      } else if (!!value.match(pattern) && formField.isInputHasClass(INVALID_CLASS)) {
        formField.deleteClassName(INVALID_CLASS);
        formField.setErrorText("");
      }

      return !formField.isInputHasClass(INVALID_CLASS);
    },

  minLength:
    (minLength: number) =>
    (formField: FormField): boolean => {
      const value = formField.getInputValue() || "";

      if ((!value || value.length < minLength) && !formField.isInputHasClass(INVALID_CLASS)) {
        formField.addClassName(INVALID_CLASS);
        formField.setErrorText(`Должно быть хотя бы ${minLength} символов`);
      } else if (!!value && value.length >= minLength && formField.isInputHasClass(INVALID_CLASS)) {
        formField.deleteClassName(INVALID_CLASS);
        formField.setErrorText("");
      }

      return !formField.isInputHasClass(INVALID_CLASS);
    },

  maxLength:
    (maxLength: number) =>
    (formField: FormField): boolean => {
      const value = formField.getInputValue() || "";

      if ((!value || value.length > maxLength) && !formField.isInputHasClass(INVALID_CLASS)) {
        formField.addClassName(INVALID_CLASS);
        formField.setErrorText(`Должно быть не меньше ${maxLength} символов`);
      } else if (!!value && value.length <= maxLength && formField.isInputHasClass(INVALID_CLASS)) {
        formField.deleteClassName(INVALID_CLASS);
        formField.setErrorText("");
      }

      return !formField.isInputHasClass(INVALID_CLASS);
    },
};
