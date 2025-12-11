const Page = require('../../models/main/page.schema.js')
const { homePagePipeline } = require('../../helpers/commonAggregationPipeline.js');
const { default: mongoose } = require('mongoose');

module.exports = {
    getPageData: async (pageName) => {
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
    },

    postPageData: async (pageName, data) => {
        try {
            const page = await Page.findOne({ slug: pageName });

            if (!page) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "PAGE_NOT_FOUND",
                    results: null
                };
            }

            const createdSections = await PageSection.insertMany(
                data.sections.map(section => ({
                    ...section,
                    page: page._id
                }))
            );

            page.sections = createdSections.map(s => s._id);
            await page.save();

            return {
                success: true,
                statusCode: 201,
                message: "PAGE_UPDATED",
                results: createdSections
            };

        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "SERVER_ERROR",
                results: error.message
            };
        }
    }


}