import axios from "axios";

const handleError = (error) =>
  Promise.reject(error.response ? error.response.data : { message: "Network error" });

// AUTH API
export const authApi = {
  signUp: async (formData) => {
    try {
      const res = await axios.post(`${OWNER_API}/auth/signup`, formData);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  signIn: async (formData) => {
    try {
      const res = await axios.post(`${OWNER_API}/auth/login`, formData);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  OAuthSignIn: async (authData) => {
    try {
      const res = await axios.post(`${OWNER_API}/auth/OAuth`, authData);
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  logout: async () => {
    try {
      const res = await axios.post(`${OWNER_API}/auth/logout`, {}, { withCredentials: true });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// UPDATE APIs
export const updateApi = {
  updateProfile: async (data) => {
    console.log('update profile data : ', data)
    try {
      const formData = new FormData();

      // Append personal & business objects as JSON
      formData.append("personal", JSON.stringify(data.personal));
      formData.append("business", JSON.stringify(data.business));
      formData.append("payment", JSON.stringify(data.payment));
      formData.append("settings", JSON.stringify(data.settings));
      formData.append("notifications", JSON.stringify(data.notifications))

      // if (data.personal?.profile_image_url instanceof File) {
      //   formData.append("profile_image_url", data.personal.profile_image_url);
      // }

      const res = await axios.post(
        `${OWNER_API}/auth/update`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  updatePassword: async (oldPassword, newPassword) => {
    console.log('after click : ', oldPassword, newPassword  )
    try {
      if(!oldPassword || !newPassword){
        return;
      }

      const res = await axios.post(`${OWNER_API}/auth/update/password`, { oldPassword, newPassword }, {
        withCredentials : true
      })

      return res.data
    } catch (error) {
      return handleError(error)
    }
  },

};

// FORGOT PASSWORD API
export const forgotApi = {
  sendCode: async (email) => {
    if(!email){
      return { message: "Email is required" };
    }
    try {
      const res = await axios.post(`${OWNER_API}/auth/forgot-password/send-code`, { email });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  verifyCode: async (email, code) => {
    if(!email || !code){
      return { message: "Email and code are required" };
    }
    try {
      const res = await axios.post(`${OWNER_API}/auth/forgot-password/verify`, { email, code });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },

  resetPassword: async (email, newPassword) => {
    if(!email || !newPassword){
      return { message: "Email and new password are required" };
    }
    try {
      const res = await axios.post(`${OWNER_API}/auth/forgot-password/reset`, { email, newPassword });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

// DELETE API
export const deleteApi = {
  deleteAccount: async () => {
    try {
      const res = await axios.post(`${OWNER_API}/auth/delete`, {}, { withCredentials: true });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
