const { responseData } = require('../../helpers/responseData')
const { login, register, OAuth, contactUs } = require('../../services/main/auth.service.js')

module.exports = {
    register: async (req, res) => {
        const body = req.body;
        const result = await register(body);

        return res.status(result?.statusCode).json(
            responseData(result?.message, result?.results, req, result?.success)
        );
    },

    login: async (req, res) => {
        const body = req.body;
        const result = await login(body, req);

        return res.status(result?.statusCode).json(
            responseData(result?.message, result?.results, req, result?.success)
        );
    },

    OAuth: async (req, res) => {
        const body = req.body;
        const result = await OAuth(body, req);

        return res.status(result?.statusCode).json(
            responseData(result?.message, result?.results, req, result?.success)
        );
    },

    contactUs: async (req, res) => {
        const body = req.body
        const result = await contactUs(body)

        return res.status(result?.statusCode).json(
            responseData(result?.message, result?.results, req, result?.success)
        );
    }
}