import { FormField } from "../../components/form-field/form-field";
import { CustomElementEvents } from "../classes/block";
import { CustomInputEvent } from "../models/input-validator.model";

export function setFormValidation(): CustomElementEvents {
  return {
    submit: function (event: CustomInputEvent) {
      event.preventDefault();
      const inputs: HTMLCollection = event.target.getElementsByTagName("input");

      const validity = this.props.formFields.reduce((acc: boolean, fieldName: string) => {
        const component: FormField = this.props.children[fieldName];

        if (
          !Object.values(inputs).some(
            (input: HTMLInputElement) => input.name === component.props.name
          )
        ) {
          return acc;
        }

        const fieldValidity = component.validateInput();

        return acc && fieldValidity;
      }, true);

      if (validity) {
        let formValue = Object.values(inputs).reduce(
          (acc: { [key: string]: string | number }, input: HTMLInputElement) => {
            acc[input.name] = input.value;
            return acc;
          },
          {}
        );
        console.log(formValue);
      } else {
        console.log("Форма не валидна");
      }
    },
  };
}
