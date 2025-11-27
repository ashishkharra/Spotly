const { responseData } = require('../../helpers/responseData')
const userAuth = require('../../services/users/userAuth.service.js')

module.exports = {
    logout: async (req, res) => {
        try {
            const userId = req.user?.id;
            const refreshTokenPlain = req.body.refreshToken;

            if (!userId) {
                return res.json(responseData("INVALID_TOKEN", {}, req, false));
            }

            if (!refreshTokenPlain) {
                return res.json(responseData("REFRESH_TOKEN_REQUIRED", {}, req, false));
            }

            const result = await userAuth.logout(userId, refreshTokenPlain);

            if (!result.success) {
                return res.json(responseData(result.message, {}, req, false));
            }

            return res.json(responseData(result.message, {}, req, true));

        } catch (err) {
            const msg = err.message || "SOMETHING_WENT_WRONG";
            return res.status(500).json(responseData(msg, {}, req, false));
        }
    },

    register: async (req, res) => {
        try {
            let { fullName, email, phone, password } = req.body;
            const result = await userAuth.register(fullName, email, phone, password);
            if (!result?.success) {
                return res.json(result?.message, {}, req, result?.success || false)
            }

            return res.json(
                responseData(result?.message, result?.results, req, result?.success || true)
            );

        } catch (error) {
            console.error("Register error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const result = await userAuth.login(email, password, req);
            return res.json(
                responseData(result?.message, result?.results, req, result?.success || true)
            );
        } catch (error) {
            console.error("Login error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },

    OAuth: async (req, res) => {
        try {
            const { full_name, email } = req.body;
            const result = await userAuth.OAuth(full_name, email, req);
            return res.json(
                responseData(result?.message, result?.results, req, result?.success || true)
            );
        } catch (error) {
            console.error("Login error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },

    updateProfile: async (req, res) => {
        try {
            const userId = req.user?.id;
            const result = await userAuth.updateUser(userId, req.body);

            if (!result.success) {
                return res.json(responseData(result?.message, result, req, result?.success || false))
            }
            return res.json(responseData(result?.message, result, req, result?.success || true))
        } catch (error) {
            console.log('Profile update error : ', error.message)
            return res.json(responseData('SERVER_ERROR', { error: error.message }, req, false))
        }
    },

    changePassword: async (req, res) => {
        try {
            const { password, newPassword } = req.body;
            const userId = req.user?.id;

            const result = await userAuth.changePassword(newPassword, password, userId);
            if (!result.success) {
                return res.json(responseData(result?.message, {}, req, result?.success || false))
            }
            return res.json(responseData(result?.message, result, req, result?.success || true))
        } catch (error) {
            console.log('Password change error : ', error.message)
            return res.json(responseData('SERVER_ERROR', { error: error.message }, req, false))
        }
    },

    getProfile: async (req, res) => {
        const userId = req.user?.id;
        const result = await getQueries.getProfile(userId);
        console.log("User Profile Data:", result);
        if (result.error) {
            return res.status(500).json({ message: result.error });
        }
        return res.status(200).json({ user: result.user });
    }
}