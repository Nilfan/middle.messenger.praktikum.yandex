import { router } from "./router";
import { expect } from "chai";

const mockedBlockConstructor = function (props) {
  return { props };
};

const mockedRoute1 = {
  pathname: "/route1",
  props: { prop: 1 },
};

const mockedRoute2 = {
  pathname: "/route2",
  props: { prop: 2 },
};

describe("Router", () => {
  it("should render correct route", () => {
    window.location.pathname = mockedRoute1.pathname;

    router
      .use(mockedRoute1.pathname, mockedBlockConstructor, mockedRoute1.props)
      .use(mockedRoute2.pathname, mockedBlockConstructor, mockedRoute2.props);

    router.start();

    expect(router.currentRoute.props).equal(mockedRoute1.props);
    expect(router.currentRoute.pathname).equal(mockedRoute1.pathname);
  });

  it("should go to route", () => {
    router.go(mockedRoute2.pathname);

    expect(router.currentRoute.props).equal(mockedRoute2.props);
    expect(router.currentRoute.pathname).equal(mockedRoute2.pathname);
  });

  it("should go back correctly", () => {
    router.back();

    expect(router.currentRoute.props).equal(mockedRoute1.props);
    expect(router.currentRoute.pathname).equal(mockedRoute1.pathname);
  });

  it("should go forward correctly", () => {
    router.back();

    expect(router.currentRoute.props).equal(mockedRoute2.props);
    expect(router.currentRoute.pathname).equal(mockedRoute2.pathname);
  });

  it("should stay in same route if pathname incorrect", () => {
    router.go("/route3");

    expect(router.currentRoute.props).equal(mockedRoute2.props);
    expect(router.currentRoute.pathname).equal(mockedRoute2.pathname);
  });
});
