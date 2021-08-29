import { ChangeUserInfoTable } from "./src/components/tables/change-user-info-table/change-user-info-table";
import { ChangeUserPasswordTable } from "./src/components/tables/change-user-password-table/change-user-password-table";
import { UserInfoTable } from "./src/components/tables/user-info-table/user-info-table";
import Block from "./src/helpers/abstract-classes/block";
import { ErrorPage } from "./src/pages/error-page/error-page";
import { LoginPage } from "./src/pages/login-page/login-page";
import { MessengerPage } from "./src/pages/messenger-page/messenger-page";
import { SignupPage } from "./src/pages/signup-page/signup-page";
import { UserProfilePage } from "./src/pages/user-profile-page/user-profile-page";
import { RouteParams } from "./src/services/router/route";
import { router, Router } from "./src/services/router/router";

export enum RoutePath {
  Messenger = "/",
  Login = "/login",
  Signup = "/signup",
  ClientError = "/404",
  ServerError = "/500",
  UserProfile = "/user-profile",
  ChangeUserPassword = "/change-user-password",
  ChangeUserProfile = "/change-user-profile",
}

export const routes: RouteParams[] = [
  {
    pathname: RoutePath.Login,
    view: LoginPage,
  },
  {
    pathname: RoutePath.Signup,
    view: SignupPage,
  },

  {
    pathname: RoutePath.ClientError,
    view: ErrorPage,
    props: {
      code: 404,
      text: "Не туда попали",
      buttonText: "Вернуться к чатам",
    },
  },
  {
    pathname: RoutePath.ServerError,
    view: ErrorPage,
    props: {
      code: 500,
      text: "Мы уже фиксим",
      buttonText: "Вернуться к чатам",
    },
  },
  {
    pathname: RoutePath.Messenger,
    view: MessengerPage,
  },

  {
    pathname: RoutePath.UserProfile,
    view: UserProfilePage,
    props: {
      Table: UserInfoTable,
      backLink: "/",
    },
  },
  {
    pathname: RoutePath.ChangeUserPassword,
    view: UserProfilePage,
    props: {
      Table: ChangeUserPasswordTable,
      backLink: "./user-profile",
    },
  },

  {
    pathname: RoutePath.ChangeUserProfile,
    view: UserProfilePage,
    props: {
      Table: ChangeUserInfoTable,
      backLink: "./user-profile",
    },
  },
];

export const ROOT_QUERY = "#root";

export function renderBlockInRoot(block: Block): Element {
  const root = document.querySelector(ROOT_QUERY);
  if (root) {
    root.appendChild(block.getBlock());
    return root;
  }
  return document.body;
}

export function useRoutes(routes: RouteParams[]): Router {
  return routes.reduce((acc, { pathname, view, props }) => acc.use(pathname, view, props), router);
}
