const { responseData } = require('../../helpers/responseData.js')
const mainSettingsService= require('../../services/main/settings.service.js')

module.exports = {
    pageData : async (req,res) => {
        try {
            const userId = req?.user?.id
            const pageName = req?.query?.page;
            const result = await mainSettingsService.pageData(userId, pageName);

            if (!result?.success) {
                return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success || false))
            }

            return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success || true))
        } catch (error) {
            console.log('Error while get home : ', error)
            return res.status(500).json(responseData('SERVER_ERROR', { error : error.message }, req, false))
        }
    }
}