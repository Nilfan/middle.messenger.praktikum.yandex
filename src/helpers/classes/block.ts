import { ObjectLiteral } from "../models/object-literal";
import EventBus from "./event-bus";

export type CustomElementEvents = { [key: string]: (args: any) => void };

export default abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  readonly eventBus: EventBus = new EventBus();
  props: ObjectLiteral;

  _element: HTMLElement;
  _meta: any = null;

  listeners: CustomElementEvents = {};

  childrenListeners: {
    [key: string]: CustomElementEvents;
  } = {};

  constructor(props: any, tagName = "div", classNames: string[] = []) {
    this._meta = {
      tagName,
      props,
      classNames,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, classNames } = this._meta;
    this._element = this._createDocumentElement(tagName, classNames);
  }

  init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount(this.props);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(_oldProps: any): void {
    return;
  }

  _componentDidUpdate(oldProps: any, newProps: any): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(_oldProps: any, _newProps: any): boolean {
    return _oldProps !== _newProps;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    const oldState = Object.assign({}, this.props);

    Object.assign(this.props, nextProps);

    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldState, this.props);
  };

  get element() {
    return this._element;
  }

  _addChildComponents() {
    if (this.props.children) {
      Object.entries(this.props.children).forEach(([key, value]: [string, Block]) => {
        const children = this._element.getElementsByTagName(key);
        if (children.length > 0) {
          children[0].replaceWith(value.getContent());
        }
      });
    }
  }

  _render(): void {
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = block;

    this._addEvents();

    this._addChildComponents();
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((key) => {
      if (typeof events[key] === "function") {
        const eventName = key;
        const eventCallback = events[key];

        this._element.addEventListener(eventName, eventCallback.bind(this));
        this.listeners[eventName] = eventCallback;
      } else {
        const tagName = key;
        const specificElementEvents = events[key];
        const specificTagCollection = this._element.getElementsByTagName(tagName);

        if (specificTagCollection.length > 0) {
          const specificElement = specificTagCollection[0];

          Object.keys(specificElementEvents).forEach((eventName: string) => {
            if (typeof specificElementEvents[eventName] === "function") {
              specificElement.addEventListener(
                eventName,
                specificElementEvents[eventName].bind(this)
              );
              if (typeof this.childrenListeners[key] === "undefined") {
                this.childrenListeners[key] = {};
              }
              this.childrenListeners[key][eventName] = specificElementEvents[eventName];
            }
          });
        }
      }
    });
  }

  private _removeEvents() {
    Object.entries(this.listeners).forEach(([eventName, eventCallback]) => {
      this._element.removeEventListener(eventName, eventCallback);
    });

    Object.keys(this.childrenListeners).forEach((tagName) => {
      const specificTagCollection = this._element.getElementsByTagName(tagName);
      const specificElement = specificTagCollection[0];

      Object.entries(this.childrenListeners[tagName]).forEach(([eventName, eventCallback]) => {
        specificElement.removeEventListener(eventName, eventCallback);
      });
    });

    this.listeners = {};
    this.childrenListeners = {};
  }

  render(): string {
    return "";
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: any) {
    const propsProxy = new Proxy(props as unknown as any, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(this) : value;
      },
      set: (target, prop: string, value) => {
        if (prop.indexOf("_") === 0) {
          throw new Error("Нет прав");
        }
        target[prop] = value;

        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });

    return propsProxy;
  }

  private _createDocumentElement(tagName: string, classNames: string[]) {
    const elem = document.createElement(tagName);
    classNames.forEach((className) => {
      elem.classList.add(className);
    });
    return elem;
  }

  show() {
    if (this._element) {
      this._element.style.display = "block";
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = "none";
    }
  }
}
