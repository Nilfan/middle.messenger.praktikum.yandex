import * as Handlebars from "handlebars";

import Block, { ComponentChildren } from "../../../helpers/classes/block";
import { InputType } from "../../../helpers/models/form-field.model";
import { FormValidators, validateFormAndSubmit } from "../../../helpers/validation/form-validation";
import { InputValidatorName } from "../../../helpers/validation/input-validation";
import { FormField } from "../../form-field/form-field";
import { changeUserPasswordTableTmpl } from "./change-user-password-table.tmpl";

export class ChangeUserPasswordTable extends Block {
  constructor() {
    const children = ChangeUserPasswordTable.getChildren();

    const events = {
      "#changePasswordForm": validateFormAndSubmit(
        [children.OldPasswordInput, children.PasswordInput, children.PasswordVerificationInput],
        () => {
          console.log("changePasswordForm");
        },
        [
          FormValidators.fieldsValuesShouldBeEqualValidator(
            [children.PasswordInput, children.PasswordVerificationInput],
            "Пароли должны совпадать"
          ),
        ]
      ),
    };
    super({ children, events }, "div");
  }

  render(): string {
    const rows = this.getFieldNames();
    return Handlebars.compile(changeUserPasswordTableTmpl)({ rows });
  }

  getFieldNames(): string[] {
    return Object.keys(this.props.children);
  }

  static getChildren(): ComponentChildren {
    return {
      OldPasswordInput: new FormField({
        label: "Старый пароль",
        placeholder: "Старый пароль",
        name: "old-password",
        type: InputType.password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      PasswordInput: new FormField({
        label: "Новый пароль",
        placeholder: "Новый пароль",
        name: "password",
        type: InputType.password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      PasswordVerificationInput: new FormField({
        label: "Новый пароль ещё раз",
        placeholder: "Новый пароль ещё раз",
        name: "password-verification",
        type: InputType.password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
    };
  }
}
