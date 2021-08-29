import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/abstract-classes/block";
import { storeManager, StoreFields } from "../../services/store-manager";
import { AvatarImage } from "../avatar-image/avatar-image";
import { Button } from "../button/button";
import { messengerHeaderTmpl } from "./messenger-header.tmpl";
import "./messenger-header.scss";
import { User } from "../../helpers/models/user.model";

export class MessengerHeaderComponent extends Block {
  constructor() {
    const children = MessengerHeaderComponent.getChildren("");
    super({ activeUserName: "", children }, "navbar", ["current-chat-header"]);

    storeManager.subscribe(StoreFields.user, (user: User) => {
      if (user) {
        this.setProps({
          activeUserName: [user.first_name, user.second_name].join(" "),
          children: MessengerHeaderComponent.getChildren(user.avatar),
        });
      }
    });
  }

  render(): string {
    return Handlebars.compile(messengerHeaderTmpl)(this.props);
  }

  static getChildren(avatarImageURL: string): ComponentChildren {
    return {
      Avatar: new AvatarImage({ avatarImageURL }),
      OptionsToggler: new Button(
        {
          label: "settings",
          isIcon: true,
          events: {
            click: () => {
              storeManager.set(
                StoreFields.isUserListOpened,
                !storeManager.get(StoreFields.isUserListOpened)
              );
            },
          },
        },
        ["settings-button", "btn_right"]
      ),
    };
  }
}
