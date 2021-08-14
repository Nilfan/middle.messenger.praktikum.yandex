import { RoutePath } from "../../route-path";
import { router } from "../helpers/classes/router";
import { storeManager } from "../helpers/classes/store";
import { UserBase } from "../helpers/models/user.model";
import { AuthApiService } from "./auth-api";

class AuthService {
  authApiService: AuthApiService = new AuthApiService();

  createNewUser(user: UserBase): Promise<any> {
    return this.authApiService.signup(user);
  }

  signin(user: UserBase): void {
    this.createNewUser(user)
      .then((res) => {
        router.go(RoutePath.Messenger);
        res();
      })
      .then(() => {
        alert("Регистрация прошла успешно, можно логиниться)");
      });
  }

  login(login: string, password: string): void {
    this.authApiService
      .signin({ login, password })
      .then(() => this.getUser())
      .then(() => router.go(RoutePath.Messenger));
  }

  logout(): Promise<any> {
    return this.authApiService.logout().then(() => router.go(RoutePath.Login));
  }

  getUser(): Promise<UserBase> {
    return this.authApiService.user().then((data) => {
      storeManager.setInStore("user", data);
      return Promise.resolve(data);
    });
  }

  checkUserAuthed(): void {
    this.getUser()
      .then(() => {
        if (location.pathname === RoutePath.Signup || location.pathname === RoutePath.Login) {
          router.go(RoutePath.Messenger);
        }
      })
      .catch(() => {
        if (location.pathname !== RoutePath.Signup && location.pathname !== RoutePath.Login) {
          router.go(RoutePath.Login);
        }
      });
  }
}

export const authService = new AuthService();
