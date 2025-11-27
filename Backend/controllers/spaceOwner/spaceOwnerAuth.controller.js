const { responseData } = require('../../helpers/responseData')
const ownerService = require('../../services/spaceOwner/spaceOwnerAuth.service.js')

module.exports = {
    logout: async (req, res) => {
        try {
            const ownerId = req.user?.id;
            const refreshTokenPlain = req.body.refreshToken;

            if (!ownerId) {
                return res.json(responseData("INVALID_TOKEN", {}, req, false));
            }

            if (!refreshTokenPlain) {
                return res.json(responseData("REFRESH_TOKEN_REQUIRED", {}, req, false));
            }

            const result = await ownerService.logout(ownerId, refreshTokenPlain);

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
            const result = await ownerService.register(fullName, email, phone, password);
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

            const result = await ownerService.login(email, password, req);
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
            const result = await ownerService.OAuth(full_name, email, req);
            return res.json(
                responseData(result?.message, result?.results, req, result?.success || true)
            );
        } catch (error) {
            console.error("Login error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },

    updateProfile: async (req, res) => {
        const ownerId = req.user?.id;
        try {
            const result = await ownerService.updateOwner(ownerId, req.body);

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
            const ownerId = req.user?.id;

            const result = await ownerService.changePassword(newPassword, password, ownerId);
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
        try {
            const ownerId = req.user?.id;
            const result = await ownerService.getProfile(ownerId);
            if (!result.success) {
                return res.json(responseData(result?.message, {}, req, result?.success || false))
            }
            return res.json(responseData(result?.message, result, req, result?.success || true))
        } catch (error) {
            console.log('Profile get error : ', error.message)
            return res.json(responseData('SERVER_ERROR', { error: error.message }, req, false))
        }
    }
}