const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },

    email: { 
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    contact: {
      type: String,
      unique: true,
      sparse: true
    },

    password: { type: String, required: true, minlength: 6 },

    role: { type: String, enum: ["user"], default: "user" },

    status: { type: String, enum: ["active", "inactive"], default: "active" },

    profilePic: { type: String, default: "no_image.png" },

    lastLogin: { type: Date },

    permission: { type: Array, default: [] },

    address: { type: String },

    region: { type: String },

    tokenVersion: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ contact: 1 }, { unique: true, sparse: true });


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);