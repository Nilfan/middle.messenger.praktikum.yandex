export interface RequestOptions {
  retries?: number;
  method?: API_METHOD;
  data: Object;
  headers: { [key: string]: string };
}

export enum API_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

function queryStringify(data: Object) {
  return Object.entries(data)
    .reduce((acc: string[], [key, value]) => {
      acc.push(acc.length === 0 ? "?" : "&");

      acc.push(`${key}=`);

      if (Array.isArray(value)) {
        acc.push(value.map((item) => item.toString()).join(","));
      } else {
        acc.push(value.toString());
      }

      return acc;
    }, [])
    .join("");
}

export function fetch(url: string, options: RequestOptions) {
  let retries = options.retries ?? 0;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const prepareXhr = () => {
      const workUrl =
        options.method === API_METHOD.GET && options.data
          ? `${url}${queryStringify(options.data)}`
          : url;

      xhr.open(options.method ?? API_METHOD.GET, workUrl);
    };

    const sendXhr = () => {
      if (options.method === API_METHOD.GET || !options.data) {
        try {
          xhr.send();
        } catch (err) {
          console.log("send error: ", err);
        }
      } else {
        xhr.send(JSON.stringify(options.data));
      }
    };

    xhr.onerror = function (err) {
      console.log("onerror error: ", err);
      if (retries > 0) {
        retries -= 1;
        prepareXhr();
        sendXhr();
      } else {
        throw new Error("onerror");
      }
    };

    xhr.onabort = function () {
      if (retries > 0) {
        retries -= 1;
        prepareXhr();
        sendXhr();
      } else {
        throw new Error();
      }
    };

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]: [string, string]) => {
        xhr.setRequestHeader(key, value);
      });
    }

    xhr.onload = function () {
      if (xhr.status !== 200 && retries && retries > 0) {
        retries -= 1;
        prepareXhr();
        sendXhr();
      } else if (xhr.status === 200) {
        resolve(xhr);
      } else {
        reject(new Error());
      }
    };

    prepareXhr();
    sendXhr();
  }).catch((error) => {
    throw error;
  });
}

export function get(url: string, options: RequestOptions) {
  return fetch(url, { ...options, method: API_METHOD.GET });
}

export function post(url: string, options: RequestOptions) {
  return fetch(url, { ...options, method: API_METHOD.POST });
}

export function put(url: string, options: RequestOptions) {
  return fetch(url, { ...options, method: API_METHOD.PUT });
}

export function deleteRequest(url: string, options: RequestOptions) {
  return fetch(url, { ...options, method: API_METHOD.DELETE });
}
