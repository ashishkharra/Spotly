const { default: mongoose } = require('mongoose');
const Page = require('../../models/main/page.schema.js')
const { homePagePipeline } = require('../../helpers/commonAggregationPipeline.js')

module.exports = {
    pageData: async (pageName) => {
        try {
            const pageData = await Page.aggregate(homePagePipeline(pageName));

            if (!pageData.length) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "PAGE_DATA_NOT_FOUND",
                    results: null
                };
            }

            const page = pageData[0];
            return {
                success: true,
                statusCode: 200,
                message: "PAGE_DATA_FETCH_SUCCESS",
                results: page
            }
        } catch (error) {
            console.log('Error while home get : ', error)
            return {
                success: false,
                statusCode: 500,
                message: 'SERVER_ERROR',
                results: error.message
            }
        }
    }
}