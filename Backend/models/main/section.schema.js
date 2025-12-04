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
      "custom_html"
    ]
  },

  title: { type: String },
  subtitle: { type: String },
  description: { type: String },

  media: [{ type: String }],

  items: [
    {
      title: { type: String },
      subtitle: { type: String },
      description: { type: String },
      icon: { type: String },
      image: { type: String }
    }
  ],

  order: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" }

}, { timestamps: true });

module.exports = mongoose.model("PageSection", PageSectionSchema);
