import { ChangeUserInfoTable } from "./src/components/tables/change-user-info-table/change-user-info-table";
import { ChangeUserPasswordTable } from "./src/components/tables/change-user-password-table/change-user-password-table";
import { UserInfoTable } from "./src/components/tables/user-info-table/user-info-table";
import { ErrorPage } from "./src/pages/error-page/error-page";
import { LoginPage } from "./src/pages/login-page/login-page";
import { MessengerPage } from "./src/pages/messenger-page/messenger-page";
import { SignupPage } from "./src/pages/signup-page/signup-page";
import { UserProfilePage } from "./src/pages/user-profile-page/user-profile-page";
import { BackButtonColumn } from "./src/components/back-button-column/back-button-column";
import { FormField } from "./src/components/form-field/form-field";
import { AvatarImage } from "./src/components/avatar-image/avatar-image";
import { ChatsList } from "./src/components/chats-list/chats-list";
import { Route, Routes } from "./src/helpers/models/route.model";
import {
  InputValidationPattern,
  InputValidatorName,
} from "./src/helpers/validation/input-validation";
import { setFormValidation } from "./src/helpers/validation/form-validation";
import { InputType } from "./src/helpers/models/form-field.model";
import { MessageTable } from "./src/components/message-table/message-table";

const pageNotFoundRoute: Route = {
  path: "/page-not-found",
  componentGetter: () => ({
    pageClass: ErrorPage,
    props: {
      code: 404,
      text: "Не туда попали",
    },
  }),
};

const serverError: Route = {
  path: "/server-error",
  componentGetter: () => ({
    pageClass: ErrorPage,
    props: {
      code: 500,
      text: "Мы уже фиксим",
    },
  }),
};

const loginPageRoute: Route = {
  path: "/login",
  componentGetter: () => ({
    pageClass: LoginPage,
    props: {
      children: {
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
      },
      formFields: ["LoginInput", "PasswordInput"],
      events: setFormValidation(),
    },
  }),
};

const signupPageRoute: Route = {
  path: "/signup",
  componentGetter: () => ({
    pageClass: SignupPage,
    props: {
      children: {
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
      },
      formFields: [
        "EmailInput",
        "LoginInput",
        "FirstNameInput",
        "LastNameInput",
        "PhoneInput",
        "PasswordInput",
        "PasswordVerificationInput",
      ],
      events: setFormValidation(),
    },
  }),
};

const userProfilePageRoute: Route = {
  path: "/user-profile",
  componentGetter: () => ({
    pageClass: UserProfilePage,
    props: {
      children: {
        AvatarImage: new AvatarImage({ avatarImageURL: "" }),
        Table: new UserInfoTable({
          email: "abcd@yandex.ru",
          userName: "student",
          firstName: "Ivan",
          lastName: "Ivanov",
          chatName: "Ivan",
          phone: "+7(999) 888-11-22",
        }),
        BackButtonColumn: new BackButtonColumn({ backLink: "./messenger" }),
      },
      avatarImageUrl: null,
    },
  }),
};

const changeUserProfilePageRoute: Route = {
  path: "/change-user-profile",
  componentGetter: () => ({
    pageClass: UserProfilePage,
    props: {
      children: {
        AvatarImage: new AvatarImage({ avatarImageURL: "" }),
        Table: new ChangeUserInfoTable({
          children: {
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
              events: {
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
          },
          formsFields: [
            "EmailInput",
            "LoginInput",
            "FirstNameInput",
            "LastNameInput",
            "PhoneInput",
          ],
          events: setFormValidation(),
        }),

        BackButtonColumn: new BackButtonColumn({
          backLink: "./user-profile",
        }),
      },
      avatarImageUrl: null,
    },
  }),
};

const changeUserPasswordPageRoute: Route = {
  path: "/change-user-password",
  componentGetter: () => ({
    pageClass: UserProfilePage,
    props: {
      avatarImageUrl: null,
      children: {
        AvatarImage: new AvatarImage({ avatarImageURL: "" }),
        Table: new ChangeUserPasswordTable({
          children: {
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
          },
          formsFields: ["OldPasswordInput", "PasswordInput", "PasswordVerificationInput"],
          events: setFormValidation(),
        }),
        BackButtonColumn: new BackButtonColumn({
          backLink: "./user-profile",
        }),
      },
    },
  }),
};

const messengerPageRoute: Route = {
  path: "/messenger",
  componentGetter: () => ({
    pageClass: MessengerPage,
    props: {
      activeChatTitle: "Саня",
      children: {
        ActiveChatAvatarImage: new AvatarImage({ avatarImageURL: "" }),
        SearchChatInput: new FormField({
          label: "",
          placeholder: "",
          name: "search-chat",
        }),
        NewMessageInput: new FormField({
          label: "",
          placeholder: "",
          name: "new-message",
        }),
        ChatsList: new ChatsList({
          chats: [
            {
              text: "New message text 1",
              date: 1627325109154,
              title: "Саня",
              avatarImageURL: "",
              id: 0,
            },
            {
              text: "New message text 2",
              date: 1627407346015,
              title: "Андрей",
              avatarImageURL: "",
              id: 1,
            },
            {
              text: "New message text 3",
              date: 1627406986015,
              title: "Богдан",
              avatarImageURL: "",
              id: 2,
            },
          ],
        }),
        MessageTable: new MessageTable({
          currentUserId: 0,
          messages: [
            {
              text: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
              date: 1627325109154,
              userId: 0,
              username: "Я",
            },
            {
              text: "Хай",
              date: 1627407346015,
              username: "Саня",
              userId: 1,
            },
          ],
        }),
      },
      formFields: ["SearchChatInput", "NewMessageInput"],
      events: setFormValidation(),
    },
  }),
};

const defaultPageRoute = { ...loginPageRoute, path: "/" };

export function hasRoute(path: string): boolean {
  return routes.findIndex((route) => route.path === path) > 0;
}

export function getRoute(path: string) {
  return routes.find((route) => route.path === path) || defaultPageRoute;
}

export const routes: Routes = [
  pageNotFoundRoute,
  serverError,
  loginPageRoute,
  signupPageRoute,
  userProfilePageRoute,
  changeUserProfilePageRoute,
  changeUserPasswordPageRoute,
  messengerPageRoute,
  defaultPageRoute,
];
