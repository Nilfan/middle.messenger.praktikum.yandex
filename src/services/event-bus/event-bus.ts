export default class EventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listeners: { [key: string]: ((...args: any) => void)[] };

  constructor() {
    this.listeners = {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, callback: (...args: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(event: string, callback: (...args: any) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listenerCallback) => callback !== listenerCallback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((callback) => callback(...args));
  }
}
