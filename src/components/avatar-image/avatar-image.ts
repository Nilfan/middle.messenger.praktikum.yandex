import * as Handlebars from "handlebars";

import Block from "../../helpers/abstract-classes/block";
import { Props } from "../../helpers/models/props.model";
import { avatarImageTmpl } from "./avatar-image.tmpl";
import "./avatar-image.scss";
import { requestService } from "../../services/request.service";

export interface AvatarImageProps {
  avatarImageURL: string;
}

export class AvatarImage extends Block {
  constructor(props: Props & AvatarImageProps) {
    super(props, "div", ["avatar-container"]);
  }

  render(): string {
    return Handlebars.compile(avatarImageTmpl)({ ...this.props, baseUrl: requestService.baseUrl3 });
  }
}
