const bcrypt = require('bcryptjs');
const User = require('../../models/user/user.schema.js');
const Owner = require('../../models/spaceOwner/spaceOwner.schema.js');
const { generateAuthToken } = require('../../helpers/responseData.js');
const { generateSecurePassword, buildResponse } = require('../../helpers/helper.js');

module.exports = {

    login: async (email, password, req) => {
        try {
            const user = await User.findOne({ email }) || await Owner.findOne({ email });

            if (!user || user.isRemoved === 1) {
                return { success: false, message: "USER_NOT_FOUND", results: {} };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { success: false, message: "INVALID_CREDENTIALS", results: {} };
            }

            const payload = {
                id: user._id,
                role: user.role,
                tokenVersion: user.tokenVersion
            };

            const tokens = await generateAuthToken(payload, req);

            return {
                success: true,
                message: `${user.role.toUpperCase()}_LOGIN_SUCCESS`,
                results: {
                    ...tokens,
                    role: user.role
                }
            };

        } catch (error) {
            console.error('Login error : ',error);
            return { success: false, message: "SERVER_ERROR", results: error.message };
        }
    },

    register: async (full_name, email, phone, password, role = "user") => {
        try {
            if (!["user", "owner"].includes(role)) {
                return { success: false, message: "INVALID_ROLE", results: {} };
            }

            const Model = role === "owner" ? Owner : User;

            const existingUser = await Model.findOne({ email });
            if (existingUser) {
                return {
                    success: false,
                    message: "USER_ALREADY_EXISTS",
                    results: existingUser
                };
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = await Model.create({
                full_name,
                email,
                contact: phone,
                password: hashedPassword,
                role
            });

            return {
                success: true,
                message: "USER_REGISTERED_SUCCESSFULLY",
                results: newUser
            };
        } catch (error) {
            console.error("Register Error:", error);
            return {
                success: false,
                message: "SERVER_ERROR",
                results: error.message
            };
        }
    },

    OAuth: async (full_name, email, role = "user", req) => {
        try {
            if (!["user", "owner"].includes(role)) {
                return { success: false, message: "INVALID_ROLE", results: {} };
            }

            const Model = role === "owner" ? Owner : User;

            let existingUser = await Model.findOne({ email });

            if (existingUser) {
                return buildResponse(existingUser, "USER_ALREADY_EXISTS", req);
            }

            const hashedPassword = await bcrypt.hash(generateSecurePassword(), 12);

            const newUser = await Model.create({
                full_name,
                email,
                password: hashedPassword,
                role
            });

            return buildResponse(newUser, "USER_REGISTERED_SUCCESSFULLY", req);

        } catch (error) {
            console.error("OAuth Error:", error);
            return {
                success: false,
                message: "SERVER_ERROR",
                results: error.message
            };
        }
    },
};