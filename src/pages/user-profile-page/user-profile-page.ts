import { userProfilePageTmpl } from "./user-profile-page.tmpl";
import * as Handlebars from "handlebars";
import Block, { ComponentChildren } from "../../helpers/classes/block";
import { AvatarImage } from "../../components/avatar-image/avatar-image";
import { BackButtonColumn } from "../../components/back-button-column/back-button-column";
import { UserInfoTable } from "../../components/tables/user-info-table/user-info-table";
import { ChangeUserInfoTable } from "../../components/tables/change-user-info-table/change-user-info-table";
import { ChangeUserPasswordTable } from "../../components/tables/change-user-password-table/change-user-password-table";

interface UserProfilePageProps {
  Table: typeof UserInfoTable | typeof ChangeUserInfoTable | typeof ChangeUserPasswordTable;
  backLink: string;
}

export class UserProfilePage extends Block {
  constructor(props: UserProfilePageProps) {
    const children = UserProfilePage.getChildren(props.backLink);
    children.Table = new props.Table();

    super({ children }, "div", ["page-content-container"]);
  }

  render(): string {
    return Handlebars.compile(userProfilePageTmpl)(this.props);
  }

  static getChildren(backLink: string): ComponentChildren {
    return {
      AvatarImage: new AvatarImage({ avatarImageURL: "" }),
      BackButtonColumn: new BackButtonColumn({ backLink }),
    };
  }
}
