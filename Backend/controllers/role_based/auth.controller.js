const { responseData } = require('../../helpers/responseData')
const { login, register, OAuth } = require('../../services/role_based/auth.service.js')

module.exports = {
    register: async (req, res) => {
        try {
            let { fullName, email, phone, password } = req.body;
            const result = await register(fullName, email, phone, password);

            if (!result?.success) {
                return res.status(result?.statusCode).json(
                    responseData(result?.message, result?.results, req, result?.success || false)
                );
            }

            return res.status(result?.statusCode).json(
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
            console.log('login body ->>>> ', req.body)

            const result = await login(email, password, req);

            if (!result?.success) {
                return res.status(401).json(
                    responseData(result?.message, result?.results, req, result?.success || false)
                );
            }
            return res.status(result?.statusCode).json(
                responseData(result?.message, result?.results, req, result?.success || false)
            );
        } catch (error) {
            console.error("Login error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },

    OAuth: async (req, res) => {
        try {
            const { fullName, email } = req.body;
            const result = await OAuth(fullName, email, req);

            if (!result?.success) {
                return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success || false))
            }
            return res.status(result?.statusCode).json(
                responseData(result?.message, result?.results, req, result?.success || true)
            );
        } catch (error) {
            console.error("Login error:", error.message);
            return res.status(500).json(responseData("SERVER_ERROR", { error: error.message }, req, false));
        }
    },
}