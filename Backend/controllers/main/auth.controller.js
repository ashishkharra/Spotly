const { responseData } = require('../../helpers/responseData')
const { login, register, OAuth, contactUs } = require('../../services/main/auth.service.js')

module.exports = {
    register: async (req, res) => {
        try {
            const body = req.body;
            const result = await register(body);

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
            const body = req.body;

            const result = await login(body, req);

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
            const body = req.body;
            console.log('body ->>>> ', body)
            const result = await OAuth(body, req);

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

    contactUs: async (req, res) => {
        try {
            const body = req.body
            const result = await contactUs(body)

            if (!result?.success) {
                return res.status(401).json(
                    responseData(result?.message, result?.results, req, result?.success || false)
                );
            }
            return res.status(result?.statusCode).json(
                responseData(result?.message, result?.results, req, result?.success || false)
            );
        } catch (error) {
            console.log("Contact us error : ", error)
            return res.status(500).json(responseData('SERVER_ERROR', { error: error.message }, req, false))
        }
    }
}