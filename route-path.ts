import Block from "./src/helpers/classes/block";

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

export const ROOT_QUERY = "#root";

export function renderBlockInRoot(block: Block): Element {
  const root = document.querySelector(ROOT_QUERY);
  if (root) {
    root.appendChild(block.getBlock());
    return root;
  }
  return document.body;
}
