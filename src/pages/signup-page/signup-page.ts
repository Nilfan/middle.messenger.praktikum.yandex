import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/abstract-classes/block";
import { signupPageTmpl } from "./signup-page.tmpl";
import { FormField } from "../../components/form-field/form-field";
import { InputType } from "../../helpers/models/form-field.model";
import {
  InputValidatorName,
  InputValidationPattern,
} from "../../helpers/validation/input-validation";
import { Button } from "../../components/button/button";
import "./signup-page.scss";
import { authService } from "../../services/auth.service";
import { FormValidators, validateFormAndSubmit } from "../../helpers/validation/form-validation";
import { SignupOptions } from "../../helpers/models/user.model";

export class SignupPage extends Block {
  constructor() {
    authService.checkUserAuthed();

    const children = SignupPage.getChildren();

    const events = {
      "#signupForm": validateFormAndSubmit(
        [
          children.EmailInput,
          children.LoginInput,
          children.FirstNameInput,
          children.LastNameInput,
          children.PhoneInput,
          children.PasswordInput,
          children.PasswordVerificationInput,
        ],
        (user: SignupOptions) => authService.signup(user),
        [
          FormValidators.fieldsValuesShouldBeEqualValidator(
            [children.PasswordInput, children.PasswordVerificationInput],
            "Пароли должны совпадать"
          ),
        ]
      ),
    };

    super({ children, events }, "div", ["center-layout"]);
  }

  render(): string {
    return Handlebars.compile(signupPageTmpl)(this.props);
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
      PhoneInput: new FormField({
        label: "Телефон",
        placeholder: "Телефон",
        name: "phone",
        validators: {
          [InputValidatorName.required]: null,
          [InputValidatorName.pattern]: InputValidationPattern.phone,
        },
      }),
      PasswordInput: new FormField({
        label: "Пароль",
        placeholder: "Пароль",
        name: "password",
        validators: {
          [InputValidatorName.required]: null,
        },
        type: InputType.password,
      }),
      PasswordVerificationInput: new FormField({
        label: "Новый пароль ещё раз",
        placeholder: "Новый пароль ещё раз",
        name: "password-verification",
        validators: {
          [InputValidatorName.required]: null,
        },
        type: InputType.password,
      }),
      SubmitButton: new Button(
        {
          label: "Зарегистрироваться",
          type: "submit",
        },
        ["btn-ok"]
      ),
    };
  }
}
