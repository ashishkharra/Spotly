const mongoose = require('mongoose')

const PageSectionSchema = new mongoose.Schema({
  page: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },

  type: {
    type: String,
    required: true,
    enum: [
      "banner",
      "hero",
      "partners",
      "features",
      "steps",
      "cta",
      "stats",
      "team",
      "testimonials",
      "custom_html",
      "custom_json"
    ]
  },

  data: mongoose.Schema.Types.Mixed,

  order: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }

}, { timestamps: true });

module.exports = mongoose.model("PageSection", PageSectionSchema);
