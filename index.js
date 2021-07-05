import ErrorPage from "./src/pages/error-page";
import LoginPage from "./src/pages/login-page";
import SigninPage from './src/pages/signin-page'
import {
  UserProfilePage
} from "./src/pages/user-profile/user-profile";

const root = document.getElementById('root');

const defaultPageName = "/login";

const pages = new Map([
  [
    "/client-error",
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
    '/signin',
    {
      pageClass: SigninPage
    }
  ],
  [
    '/user-profile',
    {
      pageClass: UserProfilePage,
      ctx: {
        email: 'abcd@yandex.ru',
        userName: 'student',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        chatName: 'Ivan',
        phone: '+7(999) 888-11-22',
      }
    }
  ]
])

const generatePage = (pageClass, params = null, ctx = {}) => {
  const page = new pageClass(params);
  return page.compile(ctx);
}

const page = pages.get(pages.has(window.location.pathname) ? window.location.pathname : defaultPageName);


const {
  pageClass,
  params,
  ctx
} = page;

root.innerHTML = generatePage(pageClass, params, ctx);