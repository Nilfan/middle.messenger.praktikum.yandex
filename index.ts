import { ChangeUserInfoTable } from "./src/components/tables/change-user-info-table/change-user-info-table";
import { ChangeUserPasswordTable } from "./src/components/tables/change-user-password-table/change-user-password-table";
import { UserInfoTable } from "./src/components/tables/user-info-table/user-info-table";
import { RouteParams } from "./src/helpers/classes/route";
import { ErrorPage } from "./src/pages/error-page/error-page";
import { MessengerPage } from "./src/pages/messenger-page/messenger-page";
import { SignupPage } from "./src/pages/signup-page/signup-page";
import { UserProfilePage } from "./src/pages/user-profile-page/user-profile-page";
import { router } from "./src/helpers/classes/router";
import { LoginPage } from "./src/pages/login-page/login-page";
import { RoutePath } from "./route-path";

const routes: RouteParams[] = [
  {
    pathname: RoutePath.Messenger,
    view: MessengerPage,
  },
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

routes.reduce((acc, { pathname, view, props }) => acc.use(pathname, view, props), router).start();
