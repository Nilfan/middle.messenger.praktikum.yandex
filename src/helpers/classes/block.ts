import { ObjectLiteral } from "../models/object-literal";
import EventBus from "../classes/event-bus";
import { Props } from "../models/props.model";
import { helpers } from "../helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomElementEvents = { [key: string]: (args: any) => void };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentChildren = { [key: string]: any };

interface Meta {
  classNames: string[];
  tagName: string;
  props: Props;
}

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
  _meta: Meta;

  listeners: CustomElementEvents = {};

  get element(): HTMLElement {
    return this._element;
  }

  childrenListeners: {
    [key: string]: CustomElementEvents;
  } = {};

  constructor(props: ObjectLiteral, tagName = "div", classNames: string[] = []) {
    this._meta = {
      tagName,
      props,
      classNames,
    };

    this.registerBlockEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  render(): string {
    return "";
  }

  getBlock(): HTMLElement {
    return this.element;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(_props: ObjectLiteral): void {
    return;
  }

  buildChildren(): ComponentChildren | null {
    return null;
  }

  componentDidUpdate(oldProps: ObjectLiteral, newProps: ObjectLiteral): boolean {
    return !helpers.isEqual(oldProps, newProps);
  }

  setProps(nextProps: ObjectLiteral): void {
    if (!nextProps) {
      return;
    }

    const oldState = Object.assign({}, this.props);

    Object.assign(this.props, nextProps);

    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldState, this.props);
  }

  show(): void {
    if (this._element) {
      this._element.style.display = "block";
    }
  }

  hide(): void {
    if (this._element) {
      this._element.style.display = "none";
    }
  }

  private init() {
    const { tagName, classNames, props } = this._meta;

    this.props = this.makePropsProxy(props);

    const elem = document.createElement(tagName);
    classNames.forEach((className) => {
      elem.classList.add(className);
    });

    this._element = elem;
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private _render(): void {
    const block = this.render();

    this.removeEvents();

    this._element.innerHTML = block;
    this.addElementEvents();

    this.addChildrenComponents();
    this.addChildrenEvents();
  }

  private addElementEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((key) => {
      if (typeof events[key] === "function") {
        const eventName = key;
        const eventCallback = events[key];

        this._element.addEventListener(eventName, eventCallback.bind(this));
        this.listeners[eventName] = eventCallback;
      }
    });
  }

  private addChildrenComponents() {
    if (this.props.children) {
      Object.entries(this.props.children).forEach(([childTag, childBlock]: [string, Block]) => {
        const childrenAnchors = this._element.getElementsByTagName(childTag);
        if (childrenAnchors.length > 0) {
          Array.from(childrenAnchors).forEach((anchor) => {
            const block = childBlock.getBlock();
            block.classList.add(childTag);
            anchor.replaceWith(block);
          });
        }
      });
    }
  }

  private addChildrenEvents(): void {
    const { events = {} } = this.props;
    Object.keys(events).forEach((tagName) => {
      if (typeof events[tagName] !== "function") {
        const specificElementEvents = events[tagName];
        const specificTagCollection = this._element.querySelectorAll(tagName);

        if (specificTagCollection.length > 0) {
          const specificElement = specificTagCollection[0];

          Object.keys(specificElementEvents).forEach((eventName: string) => {
            if (typeof specificElementEvents[eventName] === "function") {
              specificElement.addEventListener(
                eventName,
                specificElementEvents[eventName].bind(this)
              );
              if (typeof this.childrenListeners[tagName] === "undefined") {
                this.childrenListeners[tagName] = {};
              }
              this.childrenListeners[tagName][eventName] = specificElementEvents[eventName];
            }
          });
        }
      }
    });
  }

  private removeEvents() {
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

  private makePropsProxy(props: ObjectLiteral) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  private registerBlockEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _componentDidMount() {
    this.componentDidMount(this.props);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUpdate(oldProps: ObjectLiteral, newProps: ObjectLiteral): void {
    const shouldBeUpdated = this.componentDidUpdate(oldProps, newProps);
    if (shouldBeUpdated) {
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }
}
