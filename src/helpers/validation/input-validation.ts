import { CustomElementEvents } from "../classes/block";
import { helpers } from "../helpers";
import { InputType } from "../models/form-field.model";
import {
  CustomInputEvent,
  InputValidatorOptions,
  Validators,
} from "../models/input-validator.model";

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

export function setInputValidators(validatorsOptions: InputValidatorOptions): CustomElementEvents {
  const componentValidators: Function[] = [];
  const validatorsKeys: string[] = Object.keys(inputValidators);

  Object.entries(validatorsOptions).forEach(([name, option]) => {
    if (!validatorsKeys.includes(name)) {
      throw new Error("Неизвестный тип валидатора");
    }

    componentValidators.push(inputValidators[name](option));
  });

  const getValidationValue = function (event: FocusEvent) {
    return helpers.isEmpty(componentValidators)
      ? true
      : componentValidators.map((validator) => validator(event, this)).some((valid) => !!valid);
  };

  return {
    focus: getValidationValue,
    blur: getValidationValue,
  };
}

const inputValidators: Validators = {
  required:
    () =>
    (event: CustomInputEvent): boolean | null => {
      if (event.target) {
        const value = event.target.value;
        const classList = event.target.classList;
        const nextElem = event.target.nextElementSibling;

        switch (event.target.type) {
          case InputType.password:
          case InputType.text:
            if (!value && !classList.contains(INVALID_CLASS)) {
              classList.add(INVALID_CLASS);
              nextElem.textContent = "Поле не должно быть пустым";
            } else if (!!value && classList.contains(INVALID_CLASS)) {
              classList.remove(INVALID_CLASS);
              nextElem.textContent = "";
            }
            break;
        }

        return !classList.contains(INVALID_CLASS);
      }

      return null;
    },

  pattern:
    (pattern: string) =>
    (event: CustomInputEvent): void => {
      if (event.target) {
        const value = event.target.value;
        const classList = event.target.classList;
        const nextElem = event.target.nextElementSibling;

        if (!value.match(pattern) && !classList.contains(INVALID_CLASS)) {
          classList.add(INVALID_CLASS);
          nextElem.textContent = "Неверное значение поля";
        } else if (!!value.match(pattern) && classList.contains(INVALID_CLASS)) {
          classList.remove(INVALID_CLASS);
          nextElem.textContent = "";
        }
      }
    },

  minLength:
    (minLength: number) =>
    (event: CustomInputEvent): void => {
      if (event.target) {
        const value = event.target.value;
        const classList = event.target.classList;
        const nextElem = event.target.nextElementSibling;

        if ((!value || value.length < minLength) && !classList.contains(INVALID_CLASS)) {
          classList.add(INVALID_CLASS);
          nextElem.textContent = `Должно быть хотя бы ${minLength} символов`;
        } else if (!!value && value.length >= minLength && classList.contains(INVALID_CLASS)) {
          classList.remove(INVALID_CLASS);
          nextElem.textContent = "";
        }
      }
    },

  maxLength:
    (maxLength: number) =>
    (event: CustomInputEvent): void => {
      if (event.target) {
        const value = event.target.value;
        const classList = event.target.classList;
        const nextElem = event.target.nextElementSibling;

        if ((!value || value.length > maxLength) && !classList.contains(INVALID_CLASS)) {
          classList.add(INVALID_CLASS);
          nextElem.textContent = `Должно быть не меньше ${maxLength} символов`;
        } else if (!!value && value.length <= maxLength && classList.contains(INVALID_CLASS)) {
          classList.remove(INVALID_CLASS);
          nextElem.textContent = "";
        }
      }
    },
};
