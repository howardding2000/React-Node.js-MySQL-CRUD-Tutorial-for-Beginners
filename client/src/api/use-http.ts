import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface RequestConfig {
  url: string;
  method?: string;
  data?: object;
  config?: object;
}

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async (
    requestConfig: RequestConfig,
    dataHandler: Function
  ) => {
    setIsLoading(true);
    const { url, method = "GET", data = {}, config = {} } = requestConfig;
    try {
      if (url) {
        let res: AxiosResponse;
        switch (method) {
          case "GET":
            res = await axios.get(url);
            if (res.data) dataHandler(res.data);
            break;
          case "POST":
            res = await axios.post(url, data);
            if (res.data) dataHandler(res.data);
            break;
          case "DELETE":
            res = await axios.delete(url);
            if (res.data) dataHandler(res.data);
            break;
          case "PUT":
            res = await axios.put(url, data);
            if (res.data) dataHandler(res.data);
            break;
          default:
            throw "METHOD_NOT_SUPPORTED!";
        }
      } else {
        throw "URL_ERROR!";
      }
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
