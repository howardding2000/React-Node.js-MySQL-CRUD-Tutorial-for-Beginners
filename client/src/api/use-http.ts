import { useState } from "react";
import axios from "axios";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async (requestConfig, dataHandler) => {
    setIsLoading(true);
    const { url, method = "GET", data = {}, config = {} } = requestConfig;
    try {
      if (url) {
        const res = {};
        switch (method.to) {
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
        }
      } else {
        throw "URL_NULL!";
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
