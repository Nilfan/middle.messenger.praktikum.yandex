import * as Handlebars from "handlebars";

import { changeUserInfoTableTmpl } from "./change-user-info-table.tmpl";
import "./change-user-info-table.scss";
import Block, { ComponentChildren } from "../../../helpers/abstract-classes/block";
import { validateFormAndSubmit } from "../../../helpers/validation/form-validation";
import {
  InputValidatorName,
  InputValidationPattern,
} from "../../../helpers/validation/input-validation";
import { FormField } from "../../form-field/form-field";
import { StoreFields, storeManager } from "../../../services/store-manager";
import { UserInfo } from "../../../helpers/models/user.model";
import { usersService } from "../../../services/users.service";
import { InputType } from "../../../helpers/models/form-field.model";

export class ChangeUserInfoTable extends Block {
  constructor() {
    const children = ChangeUserInfoTable.getChildren();

    const events = {
      "#changeUserProfileForm": validateFormAndSubmit(
        [
          children.EmailInput,
          children.LoginInput,
          children.FirstNameInput,
          children.LastNameInput,
          children.PhoneInput,
          children.DisplayNameInput,
        ],
        (userInfo: UserInfo) => {
          usersService.changeProfile(userInfo);
        }
      ),
    };

    super({ events, children }, "div");

    storeManager.subscribe(StoreFields.user, (user: UserInfo) => {
      if (user) {
        const {
          EmailInput,
          LoginInput,
          FirstNameInput,
          LastNameInput,
          PhoneInput,
          DisplayNameInput,
        } = this.props.children;

        FirstNameInput.setValue(user.first_name);
        LastNameInput.setValue(user.second_name);
        LoginInput.setValue(user.login);
        EmailInput.setValue(user.email);
        PhoneInput.setValue(user.phone);
        DisplayNameInput.setValue(user.display_name);
      }
    });
  }

  render(): string {
    const rows = [
      "FirstNameInput",
      "LastNameInput",
      "LoginInput",
      "EmailInput",
      "PhoneInput",
      "DisplayNameInput",
    ];
    return Handlebars.compile(changeUserInfoTableTmpl)({ rows });
  }

  static getChildren(): ComponentChildren {
    return {
      ChangeAvatar: new FormField({
        label: "Изменить аватарку",
        name: "avatar",
        type: InputType.file,
        classNames: ["download-avatar"],
        events: {
          change: (event) => {
            const form = new FormData(event.currentTarget.parentElement);
            usersService.changeProfileAvatar(form);
          },
        },
      }),
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
        name: "first_name",
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      LastNameInput: new FormField({
        label: "Фамилия",
        placeholder: "Фамилия",
        name: "second_name",
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      DisplayNameInput: new FormField({
        label: "Имя в чатах",
        placeholder: "Имя в чатах",
        name: "display_name",
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
