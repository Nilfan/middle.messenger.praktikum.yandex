import { RoutePath } from "../route-helpers";
import { router } from "./router/router";
import { StoreFields, storeManager } from "./store-manager";
import { SignupOptions } from "../helpers/models/user.model";
import { authApi } from "./api/auth-api";

export enum ERROR_REASONS {
  UserLogged = "User already in system",
}
class AuthService {
  createNewUser(user: SignupOptions): Promise<{ id: number }> {
    return authApi.signup(user);
  }

  signup(options: SignupOptions): void {
    this.createNewUser(options).then(() => {
      router.go(RoutePath.Messenger);
    });
  }

  login(login: string, password: string): void {
    authApi
      .signin({ login, password })
      .then(() => this.getUser())
      .then(() => router.go(RoutePath.Messenger))
      .catch((err) => {
        if (err.message === ERROR_REASONS.UserLogged) {
          router.go(RoutePath.Messenger);
        }
      });
  }

  logout(): Promise<void> {
    return authApi.logout().then(() => router.go(RoutePath.Login));
  }

  getUser(): Promise<void> {
    return authApi.user().then((data) => {
      storeManager.set(StoreFields.user, data);
    });
  }

  checkUserAuthed(): Promise<boolean> {
    return authService
      .getUser()
      .then(() => {
        if (location.pathname === RoutePath.Signup || location.pathname === RoutePath.Login) {
          router.go(RoutePath.Messenger);
        }

        return true;
      })
      .catch(() => {
        if (location.pathname !== RoutePath.Signup && location.pathname !== RoutePath.Login) {
          router.go(RoutePath.Login);
        }
        return false;
      });
  }
}

export const authService = new AuthService();
