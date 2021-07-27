import { FormField } from "../../components/form-field/form-field";
import { CustomElementEvents } from "../classes/block";
import { CustomInputEvent } from "../models/input-validator.model";

export function setFormValidation(): CustomElementEvents {
  return {
    submit: function (event: CustomInputEvent) {
      event.preventDefault();
      const inputs: HTMLCollection = event.target.getElementsByTagName("input");

      if (typeof this.props.formFields === "undefined") {
        throw new Error(`Не хватает поля formFields в props компонента`);
      }

      const validity = this.props.formFields.reduce((acc: boolean, fieldName: string) => {
        const component: FormField = this.props.children[fieldName];

        if (typeof component === "undefined") {
          throw new Error(`Нет поля в форме с именем ${fieldName}`);
        }
        if (
          !Object.values(inputs).some(
            (input: HTMLInputElement) => input.name === component.props.name
          )
        ) {
          return acc;
        }

        const fieldValidity = getFormFieldValidity(component);

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

function getFormFieldValidity(component: FormField) {
  const inputListeners = component.childrenListeners.input;
  const inputListenersKeys =
    typeof inputListeners !== "undefined" ? Object.keys(inputListeners) : [];

  return inputListenersKeys.length !== 0
    ? inputListeners[inputListenersKeys[0]]({
        target: component.getContent().getElementsByTagName("input")[0],
      })
    : true;
}
