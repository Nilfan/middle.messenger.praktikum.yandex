import * as Handlebars from "handlebars";

import { changeUserInfoTableTmpl } from "./change-user-info-table.tmpl";
import "./change-user-info-table.scss";
import Block, { ComponentChildren } from "../../../helpers/classes/block";
import { validateFormAndSubmit } from "../../../helpers/validation/form-validation";
import {
  InputValidatorName,
  InputValidationPattern,
} from "../../../helpers/validation/input-validation";
import { FormField } from "../../form-field/form-field";

export class ChangeUserInfoTable extends Block {
  constructor() {
    const children = ChangeUserInfoTable.getChildren();

    const events = {
      "#changeUserPasswordForm": validateFormAndSubmit(
        [
          children.EmailInput,
          children.LoginInput,
          children.FirstNameInput,
          children.LastNameInput,
          children.PhoneInput,
        ],
        () => {
          console.log("changeUserPasswordForm");
        }
      ),
    };

    super({ events, children }, "div");
  }

  render(): string {
    const rows = this.getFieldNames();
    return Handlebars.compile(changeUserInfoTableTmpl)({ rows });
  }

  getFieldNames(): string[] {
    return Object.keys(this.props.children);
  }

  static getChildren(): ComponentChildren {
    return {
      EmailInput: new FormField({
        label: "Почта",
        placeholder: "Почта",
        name: "email",
        validators: {
          [InputValidatorName.required]: null,
          [InputValidatorName.pattern]: InputValidationPattern.email,
        },
      }),
      LoginInput: new FormField({
        label: "Логин",
        placeholder: "Логин",
        name: "login",
        validators: {
          [InputValidatorName.required]: null,
        },
      }),

      FirstNameInput: new FormField({
        label: "Имя",
        placeholder: "Имя",
        name: "first-name",
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      LastNameInput: new FormField({
        label: "Фамилия",
        placeholder: "Фамилия",
        name: "last-name",
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      PhoneInput: new FormField({
        label: "Телефон",
        placeholder: "Телефон",
        name: "phone",
        validators: {
          [InputValidatorName.required]: null,
          [InputValidatorName.pattern]: InputValidationPattern.phone,
        },
      }),
    };
  }
}
