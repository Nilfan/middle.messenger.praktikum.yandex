import { getRoute, hasRoute, routes } from "./routes";

const root = document.getElementById("root");

const defaultPageName = "/page-not-found";

const generatePage = (pageClass, props = {}) => {
  const page = new pageClass(props);
  return page;
};

const pageMeta = getRoute(window.location.pathname);

const { pageClass, props } = pageMeta.componentGetter();

const page = generatePage(pageClass, props);

root.appendChild(page.getContent());
