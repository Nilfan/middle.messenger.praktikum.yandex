import { RoutePath } from "../route-helpers";
import { router } from "./router/router";
import { StoreFields, storeManager } from "./store-manager";
import { User, UserInfo } from "../helpers/models/user.model";
import { usersApi } from "./api/users-api";

class UsersService {
  changePassword(oldPassword: string, newPassword: string): void {
    usersApi.changePassword(oldPassword, newPassword).then(() => router.go(RoutePath.UserProfile));
  }

  changeProfile(userInfo: UserInfo): void {
    usersApi.changeProfile(userInfo).then(() => router.go(RoutePath.UserProfile));
  }

  changeProfileAvatar(formData: FormData): void {
    usersApi.changeProfileAvatar(formData).then((data) => storeManager.set(StoreFields.user, data));
  }

  searchUsers(query: string): void {
    usersApi.searchUsers(query).then((users) => {
      storeManager.set(StoreFields.searchUsers, users);
      storeManager.set(StoreFields.searchUsersQuery, query);
    });
  }

  getUser(id: number): Promise<User> {
    return usersApi.getUser(id);
  }
}

export const usersService = new UsersService();
