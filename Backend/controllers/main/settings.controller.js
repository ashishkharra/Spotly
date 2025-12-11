const { responseData } = require('../../helpers/responseData.js')
const mainSettingsService = require('../../services/main/settings.service.js')

module.exports = {
    getPageData: async (req, res) => {
        const userId = req?.user?.id;
        const pageName = req?.query?.page;

        const result = await mainSettingsService.getPageData(userId, pageName);

        return res
            .status(result?.statusCode)
            .json(
                responseData(
                    result?.message,
                    result?.results,
                    req,
                    result?.success
                )
            );
    },

    postPageData: async (req, res) => {
        const pageName = "home";
        const result = await mainSettingsService.postPageData(pageName, req.body);

        return res.status(result.statusCode).json(
            responseData(result.message, result.results, req, result.success)
        );
    }

}