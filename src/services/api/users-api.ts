import { User } from "../../helpers/models/user.model";
import { requestService } from "./request.service";

type ChangeProfileOptions = Omit<User, "id" | "avatar">;

class UsersApi {
  changeProfile(data: ChangeProfileOptions): Promise<User> {
    return requestService.put("/user/profile", {
      data,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return requestService.put("/user/password", {
      data: {
        oldPassword,
        newPassword,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  changeProfileAvatar(data: FormData): Promise<User> {
    return requestService.put("/user/profile/avatar", {
      data,
      file: true,
    });
  }

  getUser(id: number): Promise<User> {
    return requestService.post(`/user/${id}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  searchUsers(login: string): Promise<User[]> {
    return requestService.post("/user/search", {
      data: { login },
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export const usersApi = new UsersApi();
