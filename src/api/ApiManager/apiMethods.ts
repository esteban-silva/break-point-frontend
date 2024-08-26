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

const BASE_URL_BACKEND = import.meta.env.VITE_BASE_URL_BACKEND;

class ApiMethods {
  static apiRequest = (
    method: Methods,
    url: string,
    body?: unknown
  ): Promise<IApiResponse> => {
    try {
      return new Promise((resolve) => {
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
            resolve({
              status: 500,
              message: String(error),
              data: null,
            });
          });
      });
    } catch (error) {
      return Promise.resolve({
        status: 500,
        message: String(error),
        data: null,
      });
    }
  };

  static get = (url: string) => {
    try {
      return this.apiRequest(Methods.GET, url);
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  };

  static post = (url: string, data: unknown): Promise<IApiResponse> => {
    try {
      return this.apiRequest(Methods.POST, url, data);
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };

  static delete = (url: string): Promise<IApiResponse> => {
    try {
      return this.apiRequest(Methods.DELETE, url);
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };

  static patch = (url: string, data: unknown): Promise<IApiResponse> => {
    try {
      return this.apiRequest(Methods.GET, url, data);
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };

  static put = (url: string, data: unknown): Promise<IApiResponse> => {
    try {
      return this.apiRequest(Methods.GET, url, data);
    } catch (error) {
      throw new Error("Error: " + error);
    }
  };
}

export default ApiMethods;
