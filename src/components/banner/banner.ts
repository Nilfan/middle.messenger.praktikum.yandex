import Block from "../../helpers/abstract-classes/block";
import "./banner.scss";

export class BannerComponent extends Block {
  constructor(props: { title: string }) {
    super(props, "div", ["banner"]);
  }

  render(): string {
    return this.props.title;
  }
}
