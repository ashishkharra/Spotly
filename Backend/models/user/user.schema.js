const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, unique: true, sparse: true },
    countryCode: { type: String, lowerCase: true },
    password: { type: String, required: true, minlength: 6 },
    profilePic: { type: String, default: "no_image.png" },
    username: { type: String, unique: true, sparse: true },

    role: { type: String, enum: ["user"], default: "user" },
    status: { type: String, enum: ["active", "inactive", "banned"], default: "active" },
    isRemoved: { type: Number, enum: [0, 1], default: 0 },

    lastLogin: { type: Date },
    tokenVersion: { type: Number, default: 0 },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }
      }
    },
    region: { type: String },
    socialProfiles: {
      facebook: { type: String },
      google: { type: String },
      twitter: { type: String },
      linkedin: { type: String }
    },
    preferences: {
      language: { type: String, default: "en" },
      notifications: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false }
    },

    wallet: {
      balance: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
      paymentMethods: [
        {
          type: { type: String, enum: ["card", "paypal", "stripe"], required: true },
          details: { type: mongoose.Schema.Types.Mixed },
          isDefault: { type: Boolean, default: false }
        }
      ]
    },

    loyaltyPoints: { type: Number, default: 0 },
    tier: { type: String, enum: ["bronze", "silver", "gold", "platinum"], default: "bronze" },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    deviceTokens: [String],
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ contact: 1 }, { unique: true, sparse: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ "address.coordinates": "2dsphere" });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
