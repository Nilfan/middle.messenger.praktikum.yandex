import Block from "../../helpers/abstract-classes/block";
import { helpers } from "../../helpers/helpers";
import { ObjectLiteral } from "../../helpers/models/object-literal";
import { renderBlockInRoot } from "../../../route-helpers";

export interface RouteParams {
  pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  view: any;
  props?: ObjectLiteral;
}

export class Route {
  pathname: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockClass: any;

  block: Block;

  props: ObjectLiteral;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  constructor(pathname: string, view: any, props: ObjectLiteral) {
    this.pathname = pathname;
    this.blockClass = view;
    this.props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string): boolean {
    return helpers.isEqual(pathname, this.pathname);
  }

  render(): void {
    if (!this.block) {
      this.block = new this.blockClass(this.props);
      renderBlockInRoot(this.block);
      return;
    }

    this.block.show();
  }
}
