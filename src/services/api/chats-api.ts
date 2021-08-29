import { Message } from "../../components/message-table/message-table";
import { User } from "../../helpers/models/user.model";
import { requestService } from "./request.service";

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
  unread_count: number;
  last_message: Message;
  token?: string;
}

class ChatsApi {
  getChats(): Promise<Chat[]> {
    return requestService.get("/chats", {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  createChat(title: string): Promise<Chat[]> {
    return requestService.post("/chats", {
      data: {
        title,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  deleteChat(chatId: number): Promise<void> {
    return requestService.post("/chats", {
      data: {
        chatId,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  getChatUsers(id: number): Promise<User[]> {
    return requestService.get(`/chats/${id}/users`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  addUsersToChat(users: number[], chatId: number): Promise<User> {
    return requestService.put(`/chats/users`, {
      data: {
        users,
        chatId,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  deleteUserFromChat(users: number[], chatId: number): Promise<User> {
    return requestService.deleteRequest(`/chats/users`, {
      data: {
        users,
        chatId,
      },
      headers: {
        "content-type": "application/json",
      },
    });
  }

  getChatToken(chatId: number): Promise<{ token: string }> {
    return requestService.post(`/chats/token/${chatId}`, {
      headers: {
        "content-type": "application/json",
      },
    });
  }
}

export const chatsApi = new ChatsApi();
