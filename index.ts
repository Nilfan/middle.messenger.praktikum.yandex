import { getRoute, hasRoute, routes } from "./routes";

const root = document.getElementById("root");

const defaultPageName = "/page-not-found";

const generatePage = (pageClass, props = {}) => {
  const page = new pageClass(props);
  return page;
};

const pageMeta = getRoute(
  hasRoute(window.location.pathname)
    ? window.location.pathname
    : defaultPageName
);

const { pageClass, props } = pageMeta.component;

const page = generatePage(pageClass, props);

root.appendChild(page.getContent());
