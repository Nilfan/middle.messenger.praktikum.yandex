import { helpers } from "../helpers";
import { ObjectLiteral } from "../models/object-literal";
import EventBus from "./event-bus";

class StoreManager {
  static instance: StoreManager;

  eventBus: EventBus;

  private _storeObject: ObjectLiteral = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: any;

  constructor() {
    this.eventBus = new EventBus();

    this.store = new Proxy<ObjectLiteral>(this._storeObject, {
      get: (target, prop: string) => {
        const value = helpers.cloneDeep(target[prop]);
        return value;
      },
      set: (target, prop: string, value) => {
        if (typeof value === "function") {
          throw new Error("no functions in store");
        }

        if (helpers.isNil(target[prop]) || helpers.isEqual(target[prop], value)) {
          const newValue = helpers.cloneDeep(value);
          target[prop] = newValue;
          this.eventBus.emit(prop, newValue);
        }

        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });

    StoreManager.instance = this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  setInStore(prop: string, value: any): void {
    this.store[prop] = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscribe(prop: string, callback: (...args: any) => void): void {
    this.eventBus.on(prop, callback);
    if (this.store[prop]) {
      console.log(prop, this.store[prop]);
      callback(this.store[prop]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unsubscribe(prop: string, callback: (...args: any) => void): void {
    this.eventBus.off(prop, callback);
  }
}

export const storeManager = new StoreManager();
