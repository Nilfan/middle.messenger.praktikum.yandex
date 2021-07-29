import { ObjectLiteral } from "./object-literal";
import { Props } from "./props.model";

export interface Route {
  path: string;
  componentGetter: () => {
    pageClass: any;
    props?: Props & ObjectLiteral;
  };
}

export type Routes = Route[];
