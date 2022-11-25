import { useState, useCallback } from "react";
import axios, { AxiosResponse} from "axios";

const URL_BASE = "http://localhost:8800";
interface RequestConfig {
  url: string;
  method?: string;
  data?: object;
  config?: object;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, dataHandler?: Function) => {
      setIsLoading(true);
      const { url, method = "GET", data = {}, config = {} } = requestConfig;
      try {
        if (url) {
          let res: AxiosResponse;
          switch (method.toUpperCase()) {
            case "GET":
              res = await axios.get(URL_BASE + url, config);
              if (res.data && dataHandler) dataHandler(res.data);
              break;
            case "POST":
              res = await axios.post(URL_BASE + url, data, config);
              if (res.data && dataHandler) dataHandler(res.data);
              break;
            case "DELETE":
              res = await axios.delete(URL_BASE + url, config);
              if (res.data && dataHandler) dataHandler(res.data);
              break;
            case "PUT":
              res = await axios.put(URL_BASE + url, data, config);
              if (res.data && dataHandler) dataHandler(res.data);
              break;
            default:
              throw new Error("METHOD_NOT_SUPPORTED!");
          }
        } else {
          throw new Error("URL_ERROR!");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
