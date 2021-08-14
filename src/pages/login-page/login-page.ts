import { loginPageTemplate } from "./login-page.tmpl";
import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/classes/block";
import "./login-page.scss";
import { FormField } from "../../components/form-field/form-field";
import { InputType } from "../../helpers/models/form-field.model";
import { InputValidatorName } from "../../helpers/validation/input-validation";
import { Button } from "../../components/button/button";
import { validateFormAndSubmit } from "../../helpers/validation/form-validation";
import { authService } from "../../services/auth-service";

export class LoginPage extends Block {
  constructor() {
    authService.checkUserAuthed();

    const children = LoginPage.getChildren();

    const events = {
      "#loginForm": validateFormAndSubmit(
        [children.LoginInput, children.PasswordInput],
        ({ login, password }) => authService.login(login, password)
      ),
    };

    super({ children, events }, "div", ["center-layout"]);
  }

  render(): string {
    return Handlebars.compile(loginPageTemplate)(this.props);
  }

  static getChildren(): ComponentChildren {
    return {
      LoginInput: new FormField({
        label: "Логин",
        placeholder: "Логин",
        name: "login",
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      PasswordInput: new FormField({
        label: "Пароль",
        placeholder: "Пароль",
        name: "password",
        type: InputType.password,
        validators: {
          [InputValidatorName.required]: null,
        },
      }),
      SubmitButton: new Button(
        {
          label: "Авторизоваться",
          type: "submit",
        },
        ["btn-ok"]
      ),
    };
  }
}
