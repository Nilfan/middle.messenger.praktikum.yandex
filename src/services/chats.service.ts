import { StoreFields, storeManager } from "./store-manager";
import { Chat, chatsApi } from "./api/chats-api";
import { User } from "../helpers/models/user.model";
import { usersService } from "./users.service";

class ChatsService {
  getChats(): Promise<Chat[]> {
    return chatsApi.getChats().then((chats) => {
      storeManager.set(StoreFields.chats, chats);
      return chats;
    });
  }

  createChat(title: string): Promise<void> {
    return chatsApi.createChat(title).then((data) => {
      console.log("chat added: ", data);
      this.getChats();
    });
  }

  getChatUsers(id: number): Promise<void> {
    return chatsApi
      .getChatUsers(id)
      .then((users) => storeManager.set(StoreFields.usersInChat, users));
  }

  addUserToChat(user: User): void {
    const currentChat: Chat = storeManager.get(StoreFields.currentChat);
    if (currentChat && currentChat.id) {
      chatsApi
        .addUsersToChat([user.id], currentChat.id)
        .then(() => {
          const usersInChat = [...storeManager.get(StoreFields.usersInChat), user];
          storeManager.set(StoreFields.usersInChat, usersInChat);
        })
        .then(() => {
          const query = storeManager.get(StoreFields.searchUsersQuery);
          if (query) {
            usersService.searchUsers(query);
          }
        });
    }
  }

  deleteUserFromChat(userId: number): void {
    const currentChat: Chat = storeManager.get(StoreFields.currentChat);
    if (currentChat && currentChat.id) {
      chatsApi
        .deleteUserFromChat([userId], currentChat.id)
        .then(() => {
          const usersInChat = storeManager
            .get(StoreFields.usersInChat)
            .filter((item: User) => item.id !== userId);
          storeManager.set(StoreFields.usersInChat, usersInChat);
        })
        .then(() => {
          const showUsersInChat = storeManager.get(StoreFields.showUsersInChat);
          if (showUsersInChat) {
            storeManager.set(StoreFields.showUsersInChat, true);
          }
        });
    }
  }

  getChatToken(chatId: number): Promise<string> {
    return chatsApi.getChatToken(chatId).then((data: { token: string }) => data.token);
  }

  connectToChat(chat: Chat): Promise<void> {
    return Promise.resolve(storeManager.set(StoreFields.messages, []))
      .then(() => storeManager.set(StoreFields.searchUsers, []))
      .then(() => storeManager.set(StoreFields.searchUsersQuery, ""))
      .then(() => chatsService.getChatUsers(chat.id))
      .then(() => storeManager.set(StoreFields.showUsersInChat, true))
      .then(() => chatsService.getChatToken(chat.id))
      .then((token) => storeManager.set(StoreFields.currentChat, { ...chat, token }));
  }
}

export const chatsService = new ChatsService();
