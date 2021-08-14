import { UserBase } from "../helpers/models/user.model";
import { RequestService } from "./request-service";

export class AuthApiService {
  request: RequestService;

  constructor() {
    this.request = new RequestService();
  }

  signup({
    first_name,
    second_name,
    login,
    email,
    password,
    phone,
  }: UserBase): Promise<{ id: number }> {
    const data = { first_name, second_name, login, email, password, phone };

    return this.request.post("/auth/signup", {
      data,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  signin(data: { login: string; password: string }): Promise<any> {
    return this.request.post("/auth/signin", {
      data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      withCredentials: true,
    });
  }

  user(): Promise<UserBase> {
    return this.request.get("/auth/user", {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });
  }

  logout(): Promise<any> {
    return this.request.post("/auth/logout", {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });
  }
}
