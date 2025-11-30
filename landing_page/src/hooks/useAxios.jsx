import { useState } from "react";
import api from "../apis/api";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (method, url, body = {}, config = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        method,
        url,
        data: body,
        ...config
      });

      return response.data;
    } catch (err) {
      const errorResponse = err.response?.data || { success: false, message: err.message, results : {} };

      setError(errorResponse);
      return errorResponse;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};

export default useAxios;
