const { responseData } = require('../../helpers/responseData')
const { login, register, OAuth } = require('../../services/role_based/auth.service.js')

module.exports = {
    register: async (req, res) => {
        try {
            let { fullName, email, phone, password } = req.body;
            const result = await register(fullName, email, phone, password);
            if (!result?.success) {
                return res.json(result?.message, result?.results, req, result?.success || false)
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

            const result = await login(email, password, req);
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
            const result = await OAuth(full_name, email, req);
            return res.json(
                responseData(result?.message, result?.results, req, result?.success || true)
            );
        } catch (error) {
            console.error("Login error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },
}