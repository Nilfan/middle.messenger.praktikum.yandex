import { expect } from "chai";
import { StoreFields, StoreManager } from "./store-manager";

describe("StoreManager", () => {
  const value1 = { test1: 1 };
  const value2 = { test2: 2 };

  it("should set value correctly", () => {
    const store = new StoreManager();

    store.set(StoreFields.user, value1);

    expect(store.get(StoreFields.user)).eql(value1);
  });

  it("should concat values on concatToValue", () => {
    const store = new StoreManager();
    store.concatToValue(StoreFields.messages, value1);
    store.concatToValue(StoreFields.messages, [value2]);

    expect(store.get(StoreFields.messages)).eql([value1, value2]);
  });

  it("should subscribe on values change", (done) => {
    const store = new StoreManager();

    store.subscribe(StoreFields.user, (value) => {
      expect(value).eql(value1);
      done();
    });

    store.set(StoreFields.user, value1);
  });

  it("should unsubscribe correctly", () => {
    const store = new StoreManager();

    const callback = (value) => {
      console.log(value);
    };

    store.subscribe(StoreFields.user, callback);

    expect(store.eventBus.listeners[StoreFields.user]).eql([callback]);

    store.unsubscribe(StoreFields.user, callback);

    expect(store.eventBus.listeners[StoreFields.user]).eql([]);
  });
});
