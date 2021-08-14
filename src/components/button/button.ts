import Block from "../../helpers/classes/block";
import { Props } from "../../helpers/models/props.model";
import "./button.scss";

interface ButtonProps extends Props {
  label: string;
  type?: "submit" | "button";
}

export class Button extends Block {
  constructor(props: ButtonProps, classNames: string[] = []) {
    super({ type: "button", ...props }, "button", ["btn", ...classNames]);
  }

  render(): string {
    return this.props.label;
  }
}
