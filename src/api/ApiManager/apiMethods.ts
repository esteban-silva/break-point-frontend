import IApiResponse from "./IApiResponse";

enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

const BASE_URL_BACKEND = process.env.BASE_URL_BACKEND;
console.log('URL BACK', process.env.BASE_URL_BACKEND);

class ApiMethods {
  static apiRequest = (
    method: Methods,
    url: string,
    body?: unknown
  ): Promise<IApiResponse> => {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL_BACKEND + url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(body),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  static get = (url: string) => {
    return this.apiRequest(Methods.GET, url);
  };

  static post = (url: string, data: unknown): Promise<IApiResponse> => {
    return this.apiRequest(Methods.POST, url, data);
  };

  static delete = (url: string): Promise<IApiResponse> => {
    return this.apiRequest(Methods.DELETE, url);
  };

  static patch = (url: string, data: unknown): Promise<IApiResponse> => {
    return this.apiRequest(Methods.GET, url, data);
  };

  static put = (url: string, data: unknown): Promise<IApiResponse> => {
    return this.apiRequest(Methods.GET, url, data);
  };
}

export default ApiMethods;
