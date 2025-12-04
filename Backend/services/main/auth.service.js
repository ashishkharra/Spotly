const bcrypt = require('bcryptjs');
const User = require('../../models/user/user.schema.js');
const Owner = require('../../models/spaceOwner/spaceOwner.schema.js');
const ContactUs = require('../../models/main/contactUs.schema.js')
const { generateAuthToken } = require('../../helpers/responseData.js');
const { generateSecurePassword, buildResponse, sendEmail } = require('../../helpers/helper.js');

module.exports = {

    login: async ({ email, password, role = "user" }, req) => {
        try {
            const user = await User.findOne({ email }) || await Owner.findOne({ email });

            if (!user || user.isRemoved === 1) {
                return {
                    success: false,
                    statusCode: 404,
                    message: "USER_NOT_FOUND",
                    results: {}
                };
            }

            if (role !== user.role) {
                return {
                    success: false,
                    statusCode: 403,
                    message: "INVALID_ROLE",
                    results: {}
                };
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return {
                    success: false,
                    statusCode: 401,
                    message: "INVALID_CREDENTIALS",
                    results: {}
                };
            }

            const payload = {
                id: user._id,
                role: user.role,
                tokenVersion: user.tokenVersion
            };

            const tokens = await generateAuthToken(payload, req);

            return {
                success: true,
                statusCode: 200,
                message: `${user.role.toUpperCase()}_LOGIN_SUCCESS`,
                results: {
                    ...tokens,
                    role: user.role
                }
            };

        } catch (error) {
            return {
                success: false,
                statusCode: 500,
                message: "SERVER_ERROR",
                results: error.message
            };
        }
    },

    register: async ({ fullName, email, phone, password, role = "user", countryCode }) => {
        try {
            if (!["user", "owner"].includes(role)) {
                return {
                    success: false,
                    statusCode: 400,
                    message: "INVALID_ROLE",
                    results: {}
                };
            }

            const Model = role === "owner" ? Owner : User;

            const existingUser = await Model.findOne({ email, contact: phone });
            if (existingUser) {
                return {
                    success: false,
                    statusCode: 409,
                    message: "USER_ALREADY_EXISTS",
                    results: {}
                };
            }

            await Model.create({
                fullName,
                email,
                contact: phone,
                password,
                role,
                countryCode
            });

            return {
                success: true,
                statusCode: 201,
                message: "USER_REGISTERED_SUCCESSFULLY",
                results: {}
            };

        } catch (error) {
            console.error("Register Error:", error);
            return {
                success: false,
                statusCode: 500,
                message: "SERVER_ERROR",
                results: error.message
            };
        }
    },

    OAuth: async ({ fullName, email, role = "user" }, req) => {
        try {
            if (!["user", "owner"].includes(role)) {
                return {
                    success: false,
                    statusCode: 400,
                    message: "INVALID_ROLE",
                    results: {}
                };
            }

            let existingUser = await User.findOne({ email }) || await Owner.findOne({ email });

            if (existingUser) {
                if (existingUser.role !== role) {
                    return {
                        success: false,
                        statusCode: 403,
                        message: "INVALID_ROLE_FOR_OAUTH",
                        results: {}
                    };
                }
                return await buildResponse(existingUser, "LOGIN_SUCCESS", req, 200)
            }

            const Model = role === "owner" ? Owner : User;

            const generatedPassword = generateSecurePassword();

            const newUser = await Model.create({
                fullName,
                email,
                password: generatedPassword,
                role
            });

            await sendEmail("welcome-to-our-app", {
                fullName,
                email,
                password: generatedPassword
            });

            return await buildResponse(newUser, "USER_REGISTERED_SUCCESSFULLY", req, 201)

        } catch (error) {
            console.error("OAuth Error:", error);
            return {
                success: false,
                statusCode: 500,
                message: 'SERVER_ERROR',
                results: error.message
            };
        }
    },

    contactUs: async ({ fullName, email, message, ipAddress = null, userAgent = null, performedBy = null }) => {
        try {
            let contactRecord = await ContactUsModel.findOne({ email }).sort({ createdAt: -1 });

            if (contactRecord && contactRecord.isRateLimited()) {
                return {
                    success: false,
                    statusCode: 429,
                    message: 'RATE_LIMIT_EXCEEDED',
                    results: {
                        nextAttemptAt: new Date(contactRecord.lastAttemptAt.getTime() + 15 * 60000)
                    }
                };
            }

            const newContact = new ContactUs({
                fullName,
                email,
                message,
                ipAddress,
                userAgent,
                history: [
                    {
                        action: 'CREATE_CONTACT',
                        performedBy: performedBy || { id: null, model: 'Guest' },
                        oldValue: null,
                        newValue: { fullName, email, message },
                    }
                ]
            });

            if (contactRecord) {
                await contactRecord.incrementAttempts();
            } else {
                newContact.attempts = 1;
                newContact.lastAttemptAt = new Date();
            }

            await newContact.save();

            return {
                success: true,
                statusCode: 201,
                message: 'CONTACT_REQUEST_SUCCESS',
                results: { contactId: newContact._id }
            };
        } catch (error) {
            console.error('Error while contacting : ', error.message);
            return {
                success: false,
                statusCode: 500,
                message: 'SERVER_ERROR',
                results: error.message
            };
        }
    }

};
201