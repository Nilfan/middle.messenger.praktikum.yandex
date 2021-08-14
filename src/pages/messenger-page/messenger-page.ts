import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/classes/block";
import { messengerTmpl } from "./messenger-page.tmpl";
import "./messenger-page.scss";
import { AvatarImage } from "../../components/avatar-image/avatar-image";
import { ChatsList } from "../../components/chats-list/chats-list";
import { FormField } from "../../components/form-field/form-field";
import { MessageTable } from "../../components/message-table/message-table";
import { authService } from "../../services/auth-service";

export class MessengerPage extends Block {
  constructor() {
    const children = MessengerPage.getChildren();

    authService.checkUserAuthed();

    const events = {};

    // ДОБАВИТЬ ВАЛИДАЦИЮ СТРОКИ ОТПРАВКИ СООБЩЕНИЯ

    super({ children, events }, "main", ["page-content-container"]);
  }

  render(): string {
    return Handlebars.compile(messengerTmpl)(this.props);
  }

  static getChildren(): ComponentChildren {
    return {
      ActiveChatAvatarImage: new AvatarImage({ avatarImageURL: "" }),
      SearchChatInput: new FormField({
        label: "",
        placeholder: "",
        name: "search-chat",
      }),
      NewMessageInput: new FormField({
        label: "",
        placeholder: "",
        name: "new-message",
      }),
      ChatsList: new ChatsList({
        chats: [
          {
            text: "New message text 1",
            date: 1627325109154,
            title: "Саня",
            avatarImageURL: "",
            id: 0,
          },
          {
            text: "New message text 2",
            date: 1627407346015,
            title: "Андрей",
            avatarImageURL: "",
            id: 1,
          },
          {
            text: "New message text 3",
            date: 1627406986015,
            title: "Богдан",
            avatarImageURL: "",
            id: 2,
          },
        ],
      }),
      MessageTable: new MessageTable({
        currentUserId: 0,
        messages: [
          {
            text: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
            date: 1627325109154,
            userId: 0,
            username: "Я",
          },
          {
            text: "Хай",
            date: 1627407346015,
            username: "Саня",
            userId: 1,
          },
        ],
      }),
    };
  }
}
