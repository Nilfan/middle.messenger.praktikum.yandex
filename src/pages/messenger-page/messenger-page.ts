import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/abstract-classes/block";
import { messengerTmpl } from "./messenger-page.tmpl";
import "./messenger-page.scss";
import { ChatsList } from "../../components/chats-list/chats-list";
import { FormField } from "../../components/form-field/form-field";
import { BaseMessage, Message, MessageTable } from "../../components/message-table/message-table";
import { authService } from "../../services/auth.service";
import { chatsService } from "../../services/chats.service";
import { StoreFields, storeManager } from "../../services/store-manager";
import { ChatSettings } from "../../components/chat-settings/chat-settings";
import { validateFormAndSubmit } from "../../helpers/validation/form-validation";
import { User } from "../../helpers/models/user.model";
import { Chat } from "../../services/api/chats-api";
import { MessengerHeaderComponent } from "../../components/messenger-header/messenger-header";

export class MessengerPage extends Block {
  activeSocket: WebSocket;

  constructor() {
    authService.checkUserAuthed();

    const children = MessengerPage.getChildren();

    const events = {
      "#sendMessageForm": validateFormAndSubmit([children.NewMessageInput], ({ message }) => {
        children.NewMessageInput.setValue("");
        if (this.activeSocket) {
          this.activeSocket.send(
            JSON.stringify({
              content: message,
              time: new Date(),
              type: "message",
            })
          );
        }
      }),
      "#addChatForm": validateFormAndSubmit([children.AddChatInput], ({ chatName }) => {
        children.AddChatInput.setValue("");
        chatsService.createChat(chatName);
      }),
    };

    super({ children, events }, "main", ["page-content-container"]);

    chatsService.getChats();

    storeManager.set(StoreFields.isUserListOpened, false);

    storeManager.subscribe(StoreFields.isUserListOpened, (isUserListOpened) => {
      if (isUserListOpened) {
        this.props.children.ChatSettings.show();
      } else {
        this.props.children.ChatSettings.hide();
      }
    });

    storeManager.subscribe(StoreFields.currentChat, (chat) => {
      this.props.children.NewMessageInput.setDisabled(false);
      const user = storeManager.get(StoreFields.user);
      if (chat && user) {
        this.openSocket(user, chat);
      }
    });
  }

  openSocket(user: User, chat: Chat): void {
    this.activeSocket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${chat.token}`
    );

    this.activeSocket.addEventListener("message", (event) => {
      const response = JSON.parse(event.data);

      if (response.type === "user connected") {
        console.log(`User connected: `, response.content);
      } else {
        const usersInChat = storeManager.get(StoreFields.usersInChat);
        const currentUser = storeManager.get(StoreFields.user);

        const messages = Array.isArray(response)
          ? response.map((item) => this.getCustomMessage(item, currentUser, usersInChat)).reverse()
          : [this.getCustomMessage(response, currentUser, usersInChat)];

        storeManager.concatToValue(StoreFields.messages, messages);
      }
    });

    this.activeSocket.addEventListener("open", () => {
      this.activeSocket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    });

    this.activeSocket.addEventListener("close", () => {
      console.log("Соединение закрыто");
    });
  }

  render(): string {
    return Handlebars.compile(messengerTmpl)(this.props);
  }

  showUsersList(): void {
    this.props.children.UsersList.hide();
  }

  getCustomMessage(message: BaseMessage, user: User, usersInChat: User[]): Message {
    const userInChat = usersInChat.find((item) => item.id === message.user_id);

    return {
      ...message,
      isCurrentUserMessage: user.id === message.user_id,
      userName: userInChat ? [userInChat.first_name, userInChat.second_name].join(" ") : "NULL",
    };
  }

  static getChildren(): ComponentChildren {
    return {
      AddChatInput: new FormField({
        label: "",
        placeholder: "",
        name: "chatName",
      }),
      MessengerHeader: new MessengerHeaderComponent(),
      NewMessageInput: new FormField({
        label: "",
        placeholder: "",
        name: "message",
        disabled: true,
      }),
      ChatSettings: new ChatSettings(),
      ChatsList: new ChatsList(),
      MessageTable: new MessageTable(),
    };
  }
}
