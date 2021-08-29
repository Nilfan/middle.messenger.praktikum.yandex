import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/abstract-classes/block";
import { validateFormAndSubmit } from "../../helpers/validation/form-validation";
import { FormField } from "../form-field/form-field";
import { UsersList } from "../users-list/users-list";
import { chatSettingsTmpl } from "./chat-settings.tmpl";
import "./chat-settings.scss";
import { usersService } from "../../services/users.service";
import { BannerComponent } from "../banner/banner";
import { StoreFields, storeManager } from "../../services/store-manager";

export class ChatSettings extends Block {
  constructor() {
    const children = ChatSettings.getChildren();

    const events = {
      "#searchUsersForm": validateFormAndSubmit(
        [children.SearchUsers],
        ({ query }: { query: string }) => {
          if (query) {
            usersService.searchUsers(query);
          }
        }
      ),
    };

    const chatChosen = !!storeManager.get(StoreFields.currentChat);

    storeManager.subscribe(StoreFields.currentChat, (chat) =>
      this.setProps({ chatChosen: !!chat })
    );

    super({ children, events, chatChosen }, "div", ["chat-settings-container"]);
  }

  render(): string {
    return Handlebars.compile(chatSettingsTmpl)(this.props);
  }

  static getChildren(): ComponentChildren {
    return {
      SearchUsers: new FormField({
        label: "Искать пользователей",
        name: "query",
        placeholder: "Поиск пользователей",
        events: {
          input: (event) => {
            if (!event.target.value) {
              storeManager.set(StoreFields.showUsersInChat, true);
            } else {
              storeManager.set(StoreFields.showUsersInChat, false);
            }
          },
        },
      }),
      UsersList: new UsersList(),
      Banner: new BannerComponent({ title: "Выберите чат" }),
    };
  }
}
