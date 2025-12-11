import { useState } from "react";

const useAxios = (apiInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (method, url, body = {}, config = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiInstance({
        method,
        url,
        data: body,
        ...config
      });

      return {
        success: response.data?.success ?? false,
        message: response.data?.message ?? "Unexpected response",
        results: response.data?.results ?? {}
      };

    } catch (err) {
      const data = err.response?.data;

      const errorResponse = {
        success: false,
        message: data?.message || err.message || "Server error",
        results: data?.results || {}
      };

      setError(errorResponse);
      return errorResponse;

    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};

export default useAxios;
