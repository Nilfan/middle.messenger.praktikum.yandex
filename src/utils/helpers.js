function get(obj, path, defaultValue) {
  const keys = path.split('.');
  let result = obj;

  for (let key of keys) {
    result = result[key];

    if (typeof result === 'undefined') {
      return defaultValue;
    }
  }

  return result;
}

function first(list) {
  return Array.isArray(list) && list.length ? list[0] : undefined;
}

function last(list) {
  return Array.isArray(list) ? list[list.length - 1] : undefined;
}




const baseRange = (start, end, step = 1, reverseOrder) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step)), 0);
  const result = new Array(length);

  while (length--) {
    result[reverseOrder ? length : ++index] = start;
    start += step;
  }

  return result;
}

function range(start = 0, end, step, reverseOrder = false) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (start < end ? 1 : -1) : step;
  return baseRange(start, end, step, reverseOrder);
}

function reverseRange(start, end, step) {
  return range(start, end, step, true);
}

function isLength(value) {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

function isNil(value) {
  return value === null || value === undefined;
}

function isArrayLike(value) {
  return !isNil(value) && typeof value !== "function" && isLength(value.length);
}

function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

function getTag(value) {
  if (value === null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

const objectProto = Object.prototype;

function isPrototype(value) {
  const ctor = value && value.constructor;
  const proto = (typeof ctor === "function" && ctor.prototype) || objectProto;

  return value === proto;
}

function isArguments(value) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}

function isEmpty(value) {
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

function isIterable(obj) {
  // checks for null and undefined
  if (isNil(obj)) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

export default {
  get,
  identity,
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
  isIterable
}