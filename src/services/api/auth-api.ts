import { SignupOptions, User } from "../../helpers/models/user.model";
import { requestService } from "./request.service";

class AuthApi {
  signup({
    first_name,
    second_name,
    login,
    email,
    password,
    phone,
  }: SignupOptions): Promise<{ id: number }> {
    const data = { first_name, second_name, login, email, password, phone };

    return requestService.post("/auth/signup", {
      data,
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });
  }

  signin(data: { login: string; password: string }): Promise<User> {
    return requestService.post("/auth/signin", {
      data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      withCredentials: true,
    });
  }

  user(): Promise<User> {
    return requestService.get("/auth/user", {
      withCredentials: true,
    });
  }

  logout(): Promise<void> {
    return requestService.post("/auth/logout", {
      withCredentials: true,
    });
  }
}

export const authApi = new AuthApi();
