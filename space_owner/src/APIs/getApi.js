import axios from "axios";

const OWNER_API = import.meta.env.VITE_OWNER_API_BASE;

const handleError = (error) =>
  Promise.reject(error.response ? error.response.data : { message: "Network error" });


export const getProfileApi = async () => {
    try {
      const res = await axios.get(`${OWNER_API}/auth/profile`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
}