import * as Handlebars from "handlebars";
import { ObjectLiteral } from "./models/object-literal";

Handlebars.registerHelper("numToTime", (num: number) => {
  const date = new Date(num);
  return `${date.getHours()}:${date.getMinutes()}`;
});

function get(obj: Object, path: string, defaultValue?: string | number | null) {
  const keys = path.split(".");
  let result: ObjectLiteral = obj;

  for (let key of keys) {
    result = result[key];

    if (typeof result === "undefined") {
      return defaultValue;
    }
  }

  return result;
}

function first(list: any[]) {
  return Array.isArray(list) && list.length ? list[0] : undefined;
}

function last(list: any[]) {
  return Array.isArray(list) ? list[list.length - 1] : undefined;
}

const baseRange = (start: number, end: number, step: number = 1, reverseOrder: boolean) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);

  while (length--) {
    result[reverseOrder ? length : ++index] = start;
    start += step;
  }

  return result;
};

function range(start: number = 0, end: number, step: number, reverseOrder: boolean = false) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step, reverseOrder);
}

function reverseRange(start: number, end: number, step: number) {
  return range(start, end, step, true);
}

function isLength(value: any) {
  return typeof value === "number" && value > -1 && value % 1 === 0 && value <= Number.MAX_VALUE;
}

function isNil(value: any) {
  return value === null || value === undefined;
}

function isArrayLike(value: any) {
  return !isNil(value) && typeof value !== "function" && isLength(value.length);
}

function isObjectLike(value: any) {
  return typeof value === "object" && value !== null;
}

function getTag(value: any) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return value.toString();
}

const objectProto = Object.prototype;

function isPrototype(value: Function | FunctionConstructor | Object) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value: any) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

function isEmpty(value: any) {
  if (isNil(value)) {
    return true;
  }

  if (
    isArrayLike(value) &&
    (Array.isArray(value) ||
      typeof value === "string" ||
      typeof value.splice === "function" ||
      isArguments(value))
  ) {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === "[object Map]" || tag === "[object Set]") {
    return !value.size;
  }

  if (isPrototype(value)) {
    return !Object.keys(value).length;
  }

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

function isIterable(obj: any) {
  // checks for null and undefined
  if (isNil(obj)) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

export const helpers = {
  get,
  first,
  last,
  range,
  reverseRange,
  isLength,
  isNil,
  isArrayLike,
  isObjectLike,
  getTag,
  isPrototype,
  isArguments,
  isEmpty,
  isIterable,
};
