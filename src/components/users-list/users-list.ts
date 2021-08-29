import * as Handlebars from "handlebars";
import Block from "../../helpers/abstract-classes/block";
import { User } from "../../helpers/models/user.model";
import { chatsService } from "../../services/chats.service";
import { StoreFields, storeManager } from "../../services/store-manager";
import { AvatarImage } from "../avatar-image/avatar-image";
import { Button } from "../button/button";
import { BannerComponent } from "../banner/banner";
import { UserItem } from "./user-item/user-item";
import { usersListTmpl } from "./users-list.tmpl";

export class UsersList extends Block {
  static getUsersItems(users: User[]): { [key: string]: UserItem | BannerComponent } {
    const chatUsers = storeManager.get(StoreFields.usersInChat);

    return users
      ? users.reduce((acc: { [key: string]: UserItem }, user, index) => {
          const actionType =
            chatUsers &&
            Array.isArray(chatUsers) &&
            chatUsers.find((item: User) => item.id === user.id)
              ? "remove"
              : "add";

          acc[`${UserItem.name}${index}`] = new UserItem({
            user,
            children: {
              Avatar: new AvatarImage({ avatarImageURL: user.avatar }),
              ActionButton: new Button({
                label: actionType,
                isIcon: true,
                events: {
                  click: () => {
                    if (actionType === "add") {
                      chatsService.addUserToChat(user);
                    } else {
                      chatsService.deleteUserFromChat(user.id);
                    }
                  },
                },
              }),
            },
          });

          return acc;
        }, {})
      : {};
  }

  constructor() {
    super({ children: [] }, "div", ["users-list"]);

    storeManager.set(StoreFields.showUsersInChat, true);

    storeManager.subscribe(StoreFields.searchUsers, (users) => {
      this.setProps({ children: UsersList.getUsersItems(users) });
    });

    storeManager.subscribe(StoreFields.showUsersInChat, (showUserInChat) => {
      if (showUserInChat) {
        this.setProps({
          children: UsersList.getUsersItems(storeManager.get(StoreFields.usersInChat)),
        });
      }
    });

    const chatChosenCallback = () => {
      this.setProps({
        children: UsersList.getUsersItems(storeManager.get(StoreFields.usersInChat)),
      });

      storeManager.unsubscribe(StoreFields.currentChat, chatChosenCallback);
    };

    storeManager.subscribe(StoreFields.currentChat, chatChosenCallback);
  }

  render(): string {
    return Handlebars.compile(usersListTmpl)({ users: Object.keys(this.props.children) });
  }
}
