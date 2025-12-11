const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userType"
  },

  userType: {
    type: String,
    required: true,
    enum: ["User", "Admin", "Owner"]
  },

  tokenHash: { type: String, required: true },

  device: { type: String },
  ip: { type: String },
  userAgent: { type: String },

  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
