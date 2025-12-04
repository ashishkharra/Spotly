const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  path: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },

  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PageSection"
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model("Page", PageSchema);
