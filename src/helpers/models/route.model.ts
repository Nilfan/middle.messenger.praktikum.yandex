import { Props } from "./props.model";

export interface Route {
  path: string;
  component: {
    pageClass: any;
    props?: Props;
  };
}

export type Routes = Route[];
