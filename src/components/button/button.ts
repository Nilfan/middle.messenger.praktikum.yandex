import Block from "../../helpers/abstract-classes/block";
import { Props } from "../../helpers/models/props.model";
import "./button.scss";

interface ButtonProps extends Props {
  label: string;
  type?: "submit" | "button";
  isIcon?: boolean;
}

export class Button extends Block {
  constructor(props: ButtonProps, classNames: string[] = []) {
    const iconClasses = ["material-icons", "icon-button"];
    const styleClasses = ["btn", ...(props.isIcon ? iconClasses : []), ...classNames];
    super({ type: "button", ...props }, "button", styleClasses);
  }

  render(): string {
    return this.props.label;
  }
}
