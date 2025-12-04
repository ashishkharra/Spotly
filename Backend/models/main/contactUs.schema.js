const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxlength: 100,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address"
            ],
        },

        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 2000,
        },

        status: {
            type: String,
            enum: ['new', 'in_progress', 'resolved', 'closed'],
            default: 'new',
        },

        response: {
            type: String,
            trim: true,
            default: null,
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },

        history: [
            {
                action: { type: String },
                performedBy: {
                    id: { type: mongoose.Schema.Types.ObjectId, default: null },
                    model: { type: String, enum: ['User', 'Owner', 'Guest'], default: 'Guest' }
                },
                oldValue: { type: mongoose.Schema.Types.Mixed },
                newValue: { type: mongoose.Schema.Types.Mixed },
                createdAt: { type: Date, default: Date.now },
            },
        ],

        ipAddress: {
            type: String,
            default: null,
        },

        userAgent: {
            type: String,
            default: null,
        },

        attempts: {
            type: Number,
            default: 0,
        },

        lastAttemptAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

ContactUsSchema.methods.isRateLimited = function (maxAttempts = 5, cooldownMinutes = 15) {
    if (!this.lastAttemptAt) return false;
    const cooldownEnd = new Date(this.lastAttemptAt.getTime() + cooldownMinutes * 60000);
    return this.attempts >= maxAttempts && cooldownEnd > new Date();
};

ContactUsSchema.methods.incrementAttempts = function () {
    this.attempts += 1;
    this.lastAttemptAt = new Date();
    return this.save();
};

ContactUsSchema.methods.resetAttempts = function () {
    this.attempts = 0;
    this.lastAttemptAt = null;
    return this.save();
};

const ContactUs = mongoose.model('ContactUs', ContactUsSchema);

module.exports = ContactUs;
