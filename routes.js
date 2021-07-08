import {
  ChangeUserInfoTable
} from "./src/components/change-user-info-table/change-user-info-table";
import {
  ChangeUserPasswordTable
} from "./src/components/change-user-password-table/change-user-password-table";
import {
  UserInfoTable
} from "./src/components/user-info-table/user-info-table";
import {
  ErrorPage
} from "./src/pages/error-page/error-page";
import {
  LoginPage
} from "./src/pages/login-page/login-page";
import {
  MessengerPage
} from "./src/pages/messenger-page/messenger-page";
import {
  SignupPage
} from './src/pages/signup-page/signup-page'
import {
  UserProfilePage
} from "./src/pages/user-profile-page/user-profile-page";



export const routes = new Map([
  [
    "/page-not-found",
    {
      pageClass: ErrorPage,
      ctx: {
        code: 404,
        text: 'Не туда попали'
      }
    }
  ],
  [
    "/server-error",
    {
      pageClass: ErrorPage,
      ctx: {
        code: 500,
        text: 'Мы уже фиксим'
      }
    }
  ],
  [
    "/login",
    {
      pageClass: LoginPage
    }
  ],
  [
    "/",
    {
      pageClass: LoginPage
    }
  ],
  [
    '/signup',
    {
      pageClass: SignupPage
    }
  ],
  [
    '/user-profile',
    {
      pageClass: UserProfilePage,
      ctx: {
        table: (new UserInfoTable()).compile({
          email: 'abcd@yandex.ru',
          userName: 'student',
          firstName: 'Ivan',
          lastName: 'Ivanov',
          chatName: 'Ivan',
          phone: '+7(999) 888-11-22',
        }),
        avatarImageUrl: null
      }
    }
  ],
  [
    '/change-user-profile',
    {
      pageClass: UserProfilePage,
      ctx: {
        table: (new ChangeUserInfoTable()).compile({
          email: 'abcd@yandex.ru',
          userName: 'student',
          firstName: 'Ivan',
          lastName: 'Ivanov',
          chatName: 'Ivan',
          phone: '+7(999) 888-11-22',
        }),
        avatarImageUrl: null
      }
    }
  ],
  [
    '/change-user-password',
    {
      pageClass: UserProfilePage,
      ctx: {
        table: (new ChangeUserPasswordTable()).compile({}),
        avatarImageUrl: null
      }
    }
  ],
  [
    '/messenger',
    {
      pageClass: MessengerPage
    },
  ]
])