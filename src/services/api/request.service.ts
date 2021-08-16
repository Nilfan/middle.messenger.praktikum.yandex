import { ObjectLiteral } from "../../helpers/models/object-literal";

interface RequestOptions {
  retries?: number;
  method?: API_METHOD;
  data?: any;
  headers?: { [key: string]: string };
  withCredentials?: boolean;
  file?: boolean;
}

enum API_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

class RequestService {
  baseUrl = "https://ya-praktikum.tech/api/v2";
  resourceUrl = "http://ya-praktikum.tech/api/v2/resources";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch(url: string, options: RequestOptions): Promise<any> {
    let retries = options.retries ?? 0;

    const fullUrl = this.baseUrl + url;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const prepareXhr = () => {
        const workUrl =
          options.method === API_METHOD.GET && options.data
            ? `${fullUrl}${this.queryStringify(options.data)}`
            : fullUrl;

        xhr.open(options.method ?? API_METHOD.GET, workUrl);
        xhr.withCredentials =
          typeof options.withCredentials !== "undefined" ? options.withCredentials : true;

        if (options.headers) {
          Object.entries(options.headers).forEach(([key, value]: [string, string]) => {
            xhr.setRequestHeader(key, value);
          });
        }
      };

      const sendXhr = () => {
        if (options.method === API_METHOD.GET || !options.data) {
          try {
            xhr.send();
          } catch (err) {
            console.log("send error: ", err);
          }
        } else {
          xhr.send(!!options.file ? options.data : JSON.stringify(options.data));
        }
      };

      xhr.onerror = function (err) {
        if (retries > 0) {
          retries -= 1;
          prepareXhr();
          sendXhr();
        } else {
          throw new Error(err.type);
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

      xhr.onload = function () {
        if (xhr.status !== 200 && retries && retries > 0) {
          retries -= 1;
          prepareXhr();
          sendXhr();
        } else if (xhr.status === 200) {
          let response = "";

          try {
            response = JSON.parse(xhr.response);
          } catch (err) {}

          resolve(response);
        } else {
          reject(new Error(JSON.parse(xhr.response)?.reason));
        }
      };

      prepareXhr();
      sendXhr();
    }).catch((error) => {
      throw error;
    });
  }

  get(url: string, options: RequestOptions) {
    return this.fetch(url, { ...options, method: API_METHOD.GET });
  }

  post(url: string, options: RequestOptions) {
    return this.fetch(url, { ...options, method: API_METHOD.POST });
  }

  put(url: string, options: RequestOptions) {
    return this.fetch(url, { ...options, method: API_METHOD.PUT });
  }

  deleteRequest(url: string, options: RequestOptions) {
    return this.fetch(url, { ...options, method: API_METHOD.DELETE });
  }

  private queryStringify(data: ObjectLiteral) {
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
}

export const requestService = new RequestService();
