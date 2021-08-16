import { FormField } from "../../components/form-field/form-field";
import { CustomElementEvents } from "../abstract-classes/block";
import { helpers } from "../helpers";
import { CustomInputEvent } from "../models/input-validator.model";

type FormValidatorConstructor = (formFields?: FormField[], errorText?: string) => () => boolean;

type FormValidator = () => boolean;

export const FormValidators: { [key: string]: FormValidatorConstructor } = {
  fieldsValuesShouldBeEqualValidator:
    (formFields: FormField[], errorText: string) => (): boolean => {
      const validity = helpers.isEmpty(
        formFields.filter((item) => item.getInputValue() !== formFields[0].getInputValue())
      );

      if (!validity) {
        formFields.forEach((field) => field.setErrorText(errorText));
      }

      return validity;
    },
};

export function validateFormAndSubmit(
  formFields: FormField[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitCallback: (...args: any) => void,
  formValidators: FormValidator[] = []
): CustomElementEvents {
  return {
    submit: function (event: CustomInputEvent) {
      event.preventDefault();

      const inputs: HTMLCollection = event.target.getElementsByTagName("input");

      let validity = true;

      validity = formFields.reduce((acc: boolean, formField: FormField) => {
        const fieldValidity = formField.validateInput();

        return acc && fieldValidity;
      }, validity);

      validity = formValidators.reduce((acc: boolean, formValidator: FormValidator) => {
        const formValidity = formValidator();

        return acc && formValidity;
      }, validity);

      if (validity) {
        const formValue = Object.values(inputs).reduce(
          (acc: { [key: string]: string | number }, input: HTMLInputElement) => {
            acc[input.name] = input.value;
            return acc;
          },
          {}
        );
        submitCallback(formValue);
      }
    },
  };
}
