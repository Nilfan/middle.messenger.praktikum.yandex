import {
  routes
} from "./routes"

const root = document.getElementById('root');

const defaultPageName = "/page-not-found";

const generatePage = (pageClass, params = null, ctx = {}) => {
  const page = new pageClass(params);
  return page.compile(ctx);
}

const page = routes.get(routes.has(window.location.pathname) ? window.location.pathname : defaultPageName);


const {
  pageClass,
  params,
  ctx
} = page;

root.innerHTML = generatePage(pageClass, params, ctx);