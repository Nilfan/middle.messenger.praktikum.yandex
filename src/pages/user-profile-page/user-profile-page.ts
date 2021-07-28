import { userProfilePageTmpl } from "./user-profile-page.tmpl";
import * as Handlebars from "handlebars";
import { Props } from "../../helpers/models/props.model";
import Block from "../../helpers/classes/block";

export class UserProfilePage extends Block {
  constructor(props: Props) {
    const containerClassNames = ["page-content-container"];
    super(props, "div", containerClassNames);
  }

  render(): string {
    return Handlebars.compile(userProfilePageTmpl)(this.props);
  }
}
