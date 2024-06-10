import axios from "axios";
import { useState } from "react";

const useFetch = () => {
  const [apiData, setApiData] = useState();
  const [isLoading, setisLoading] = useState();
  const [hasError, setHasError] = useState();

  const getApi = (url) => {
    setisLoading(true);
    axios
      .get(url)
      .then((res) => {
        setHasError(false);
        setApiData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => {
          setisLoading(false);
        }, 500);
      });
  };
  return [apiData, getApi, isLoading, hasError];
};

export default useFetch;
