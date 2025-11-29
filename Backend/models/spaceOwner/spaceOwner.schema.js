const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ownerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },

    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true,
    },

    password: { type: String, required: true, minlength: 6 },

    role: { type: String, enum: ["user"], default: "user" },

    status: { type: String, enum: ["active", "inactive"], default: "active" },

    profilePic: { type: String, default: "no_image.png" },

    lastLogin: { type: Date },

    permission: { type: Array, default: [] },

    address: { type: String },

    region: { type: String },

    contact: { 
      type: String, 
      default: "XXX-XXX-XXXX", 
    },

    tokenVersion: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

ownerSchema.index({ email: 1 }, { unique: true });
ownerSchema.index({ contact: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Owner", ownerSchema);