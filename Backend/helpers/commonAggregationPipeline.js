const { default: mongoose } = require("mongoose")

module.exports = {

  homePagePipeline : (slug = "home") => [
    {
      $match: {
        slug,
        status: "active"
      }
    },
    {
      $lookup: {
        from: "pagesections",
        localField: "sections",
        foreignField: "_id",
        as: "sections"
      }
    },
    {
      $addFields: {
        sections: {
          $filter: {
            input: "$sections",
            as: "sec",
            cond: { $eq: ["$$sec.status", "active"] }
          }
        }
      }
    },
    {
      $addFields: {
        sections: {
          $sortArray: {
            input: "$sections",
            sortBy: { order: 1 }
          }
        }
      }
    },
    {
      $project: {
        name: 1,
        slug: 1,
        path: 1,
        sections: 1,
        createdAt: 1
      }
    }
  ]

}