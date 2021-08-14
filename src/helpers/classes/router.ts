import { Route } from "./route";
import { ObjectLiteral } from "../models/object-literal";
import { ROOT_QUERY } from "../../../route-path";

class Router {
  static instance: Router;

  routes: Route[];
  history: History;
  currentRoute: Route;
  rootQuery: string;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this.rootQuery = ROOT_QUERY;

    Router.instance = this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  use(pathname: string, block: any, props: ObjectLiteral = {}): Router {
    const route = new Route(pathname, block, props);
    this.routes.push(route);
    return this;
  }

  start(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.onpopstate = (event: any) => {
      console.log("popstate event: ", event);
      this.onRoute(event.currentTarget.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      console.log("route not found");
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): Route | null {
    return this.routes.find((route) => route.match(pathname)) || null;
  }
}

export const router = new Router();
