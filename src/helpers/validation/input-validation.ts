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
  const componentValidators: Function[] = [];

  Object.entries(validatorsOptions).forEach(([name, option]) => {
    componentValidators.push(inputValidators[name](option));
  });

  return (element: EventTarget | null) => {
    return helpers.isEmpty(componentValidators)
      ? true
      : componentValidators.map((validator) => validator(element)).some((valid) => !!valid);
  };
}

const inputValidators: Validators = {
  required:
    () =>
    (element: HTMLInputElement): boolean => {
      if (element) {
        const value = element.value;
        const classList = element.classList;
        const nextElem = element.nextElementSibling;

        switch (element.type) {
          case InputType.password:
          case InputType.text:
            if (!value && !classList.contains(INVALID_CLASS)) {
              classList.add(INVALID_CLASS);
              if (nextElem) {
                nextElem.textContent = "Поле не должно быть пустым";
              }
            } else if (!!value && classList.contains(INVALID_CLASS)) {
              classList.remove(INVALID_CLASS);
              if (nextElem) {
                nextElem.textContent = "";
              }
            }
            break;
        }

        return !classList.contains(INVALID_CLASS);
      }

      return false;
    },

  pattern:
    (pattern: string) =>
    (element: HTMLInputElement): boolean => {
      if (element) {
        const value = element.value;
        const classList = element.classList;
        const nextElem = element.nextElementSibling;

        if (!value.match(pattern) && !classList.contains(INVALID_CLASS)) {
          classList.add(INVALID_CLASS);
          if (nextElem) {
            nextElem.textContent = "Неверное значение поля";
          }
        } else if (!!value.match(pattern) && classList.contains(INVALID_CLASS)) {
          classList.remove(INVALID_CLASS);
          if (nextElem) {
            nextElem.textContent = "";
          }
        }

        return !classList.contains(INVALID_CLASS);
      }

      return false;
    },

  minLength:
    (minLength: number) =>
    (element: HTMLInputElement): boolean => {
      if (element) {
        const value = element.value;
        const classList = element.classList;
        const nextElem = element.nextElementSibling;

        if ((!value || value.length < minLength) && !classList.contains(INVALID_CLASS)) {
          classList.add(INVALID_CLASS);
          if (nextElem) {
            nextElem.textContent = `Должно быть хотя бы ${minLength} символов`;
          }
        } else if (!!value && value.length >= minLength && classList.contains(INVALID_CLASS)) {
          classList.remove(INVALID_CLASS);
          if (nextElem) {
            nextElem.textContent = "";
          }
        }
        return !classList.contains(INVALID_CLASS);
      }
      return false;
    },

  maxLength:
    (maxLength: number) =>
    (element: HTMLInputElement): boolean => {
      if (element) {
        const value = element.value;
        const classList = element.classList;
        const nextElem = element.nextElementSibling;

        if ((!value || value.length > maxLength) && !classList.contains(INVALID_CLASS)) {
          classList.add(INVALID_CLASS);
          if (nextElem) {
            nextElem.textContent = `Должно быть не меньше ${maxLength} символов`;
          }
        } else if (!!value && value.length <= maxLength && classList.contains(INVALID_CLASS)) {
          classList.remove(INVALID_CLASS);
          if (nextElem) {
            nextElem.textContent = "";
          }
        }
        return !classList.contains(INVALID_CLASS);
      }
      return false;
    },
};
