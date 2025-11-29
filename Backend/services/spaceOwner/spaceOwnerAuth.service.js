const bcrypt = require('bcryptjs')
const { generateAuthToken } = require('../../helpers/responseData.js')
const Owner = require('../../models/spaceOwner/spaceOwner.schema.js');
const RefreshToken = require('../../models/token/refreshToken.schema.js')
const { generateSecurePassword, buildResponse, cleanObject } = require('../../helpers/helper.js');
module.exports = {

    login: async (email, password, req) => {
        try {
            const Owner = await Owner.findOne({ email });

            if (!Owner || Owner.isRemoved === 1) {
                return { success: false, message: "Owner_NOT_FOUND", results: {} };
            }

            const isMatch = await bcrypt.compare(password, Owner.password);
            if (!isMatch) {
                return { success: false, message: "INVALID_CREDENTIALS", results: {} };
            }

            const payload = {
                id: Owner._id,
                role: Owner.role,
                tokenVersion: Owner.tokenVersion
            };

            const tokens = await generateAuthToken(payload, req);

            return {
                success: true,
                message: `${Owner.role.toUpperCase()}_LOGIN_SUCCESS`,
                results: {
                    ...tokens,
                    role: Owner.role
                }
            };

        } catch (err) {
            console.error(err);
            return { success: false, message: "SERVER_ERROR", results: {} };
        }
    },

    logout: async (ownerId, refreshTokenPlain) => {
        try {
            const tokenHash = crypto
                .createHash("sha256")
                .update(refreshTokenPlain)
                .digest("hex");

            await RefreshToken.findOneAndDelete({
                ownerId,
                tokenHash
            });

            return { success: true, message: "LOGOUT_SUCCESSFUL" };

        } catch (error) {
            console.error("Logout Error:", error);
            return { success: false, message: "SERVER_ERROR" };
        }
    },

    register: async (fullName, email, phone, password) => {
        try {
            const existingOwner = await Owner.findOne({ email, phone });
            if (existingOwner) {
                return {
                    success: true,
                    message: "Owner_ALREADY_EXISTS",
                    results: existingOwner
                };
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const newOwner = await Owner.create({
                fullName,
                email,
                contact: phone,
                password: hashedPassword,
            });

            return {
                success: true,
                message: "Owner_REGISTERED_SUCCESSFULLY",
                results: newOwner,
            };
        } catch (error) {
            console.error("Signup Error:", error);
            return {
                success: false,
                message: "SERVER_ERROR",
                error: error.message,
            };
        }
    },

    OAuth: async (fullName, email, req) => {
        try {
            const existingOwner = await Owner.findOne({ email, phone });

            if (existingOwner) {
                return buildResponse(existingOwner, "Owner_ALREADY_EXISTS", req);
            }

            const hashedPassword = await bcrypt.hash(generateSecurePassword(), 12);

            const newOwner = await Owner.create({
                fullName,
                email,
                contact: phone,
                password: hashedPassword,
            });

            return buildResponse(newOwner, "Owner_REGISTERED_SUCCESSFULLY", req);

        } catch (error) {
            console.error("Signup Error:", error);
            return {
                success: false,
                message: "SERVER_ERROR",
                error: error.message,
            };
        }
    },

    getProfile: async (ownerId) => {
        try {
            const owner = await Owner.findById(ownerId).select('-password');
            if (!owner) {
                return { success: false, message: "PROFILE_NOT_FOUND" }
            }
            return { success: true, message: "PROFILE_FETCHED_SUCCESSFULLY", owner }
        } catch (error) {
            console.error("Profile fetch error:", error);
            return {
                success: false,
                message: "SERVER_ERROR",
                error: error.message,
            };
        }
    },

    updateOwner: async (ownerId, bodyData) => {
        try {
            const cleanedObject = cleanObject(bodyData)
            
            if (Object.keys(cleanedObject).length === 0) {
                return { success: false, message: "NO_DATA_PROVIDED" };
            }

            await Owner.findByIdAndUpdate(ownerId, cleanedObject, { new: true });

            return { success: true, message: "PROFILE_UPDATED_SUCCESSFULLY" }
        } catch (error) {
            console.log('Profile update error : ', error)
            return {
                success: false,
                message: "SERVER_ERROR",
                error: error.message,
            };
        }
    },

    changePassword: async (newPassword, password, ownerId) => {
        try {
            const Owner = await Owner.findById(ownerId)
            if (!Owner) {
                return { success: false, message: 'OWNER_NOT_FOUND' }
            }
            const isMatch = await bcrypt.compare(newPassword, password)
            if (!isMatch) {
                return { success: false, message: 'PASSWORD_DO_NOT_MATCH' }
            }
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            
            await Owner.findByIdAndUpdate(ownerId, { password: hashedPassword })

            return { success: true, message: 'PASSWORD_CHANGED_SUCCESSFULLY' };
        } catch (error) {
            console.error('Error updating password:', error);
            return { success: false, message: 'SERVER_ERROR', error: error.message };
        }
    }
    
}