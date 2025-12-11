// apis/adminAuth.js
import { createApi } from "./base";

export const adminAuthApi = createApi(import.meta.env.VITE_API_BASE_URL+"/admin/auth");