const bcrypt = require('bcryptjs')
const { generateAuthToken } = require('../../helpers/responseData.js')
const User = require('../../models/user/user.schema.js');
const RefreshToken = require('../../models/token/refreshToken.schema.js')
const { generateSecurePassword, buildResponse, cleanObject } = require('../../helpers/helper.js');
module.exports = {

    login: async (email, password, req) => {
        try {
            const user = await User.findOne({ email });

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

        } catch (err) {
            console.error(err);
            return { success: false, message: "SERVER_ERROR", results: {} };
        }
    },

    logout: async (userId, refreshTokenPlain) => {
        try {
            const tokenHash = crypto
                .createHash("sha256")
                .update(refreshTokenPlain)
                .digest("hex");

            await RefreshToken.findOneAndDelete({
                userId,
                tokenHash
            });

            return { success: true, message: "LOGOUT_SUCCESSFUL" };

        } catch (error) {
            console.error("Logout Error:", error);
            return { success: false, message: "SERVER_ERROR" };
        }
    },

    register: async (full_name, email, phone, password) => {
        try {
            const existingUser = await User.findOne({ email, phone });
            if (existingUser) {
                return {
                    success: true,
                    message: "USER_ALREADY_EXISTS",
                    results: existingUser
                };
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await User.create({
                full_name,
                email,
                contact: phone,
                password: hashedPassword,
            });

            return {
                success: true,
                message: "USER_REGISTERED_SUCCESSFULLY",
                results: newUser,
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

    OAuth: async (full_name, email, req) => {
        try {
            const existingUser = await User.findOne({ email, phone });

            if (existingUser) {
                return buildResponse(existingUser, "USER_ALREADY_EXISTS", req);
            }

            const hashedPassword = await bcrypt.hash(generateSecurePassword(), 12);

            const newUser = await User.create({
                full_name,
                email,
                contact: phone,
                password: hashedPassword,
            });

            return buildResponse(newUser, "USER_REGISTERED_SUCCESSFULLY", req);

        } catch (error) {
            console.error("Signup Error:", error);
            return {
                success: false,
                message: "SERVER_ERROR",
                error: error.message,
            };
        }
    },

    getProfile: async (userId) => {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                return { success: false, message: 'USER_NOT_FOUND' };
            }
            return { success: true, message: 'PROFILE_FETCHED_SUCCESSFULLY', user };
        } catch (error) {
            console.error('Error getting profile:', error);
            return { success: false, message: 'SERVER_ERROR', error: error.message}
        }
    },

    checkVehicle: async (userId, plate_number) => {
        try {
            const result = await pool.query(
                `SELECT vehicles FROM users_vehicles WHERE user_id = $1 AND plate_number = $2`,
                [userId, plate_number]
            );

            if (result.rows.length === 0) {
                return { error: 'No vehicles found for user' };
            }

            return { vehicles: result.rows[0].vehicles };
        } catch (error) {
            console.error('Error checking user vehicles:', error);
            return { error: 'Internal server error' };
        }
    },

    updateUser: async (userId, bodyData) => {
        try {
            const cleanedObject = cleanObject(bodyData)
            if (Object.keys(cleanedObject).length === 0) {
                return { success: false, message: 'NO_DATA_PROVIDED' }
            }
            const check = await User.findByIdAndUpdate(userId, cleanedObject, { new: true })
            if (!check) {
                return { success : false, message : 'USER_NOT_FOUND' }
            }
            return { success: true, message: 'PROFILE_UPDATED_SUCCESSFULLY' }
        } catch (error) {
            console.log('Profile update error : ', error)
            return { success : false, message : 'SERVER_ERROR', error : error.message }
        }
    },

    changePassword: async (newPassword, password, userId) => {
        try {
            const user = await User.findById(userId)
            if (!user) {
                return { success: false, message: 'USER_NOT_FOUND' }
            }
            const isMatch = await bcrypt.compare(newPassword, password)
            if (!isMatch) {
                return { success: false, message: 'PASSWORD' }
            }
            const hashedPassword = await bcrypt.hash(newPassword, 12)
            user.password = hashedPassword
            await user.save()

            return { success: true, message: 'PASSWORD_CHANGED_SUCCESSFULLY' };
        } catch (error) {
            console.error('Error updating password:', error);
            return { success: false, message: 'SERVER_ERROR', error: error.message };
        }
    },

    uploadVehicle: async (userId, vehicleData) => {
        try {
            const query = `INSERT INTO users_vehicles (user_id, vehicles)
            VALUES ($1, $2::jsonb)
            ON CONFLICT (user_id)
            DO UPDATE SET vehicles = $2::jsonb
            RETURNING id`;
            const updatedVehicles = [...existingVehicles, vehicleData];

            const result = await pool.query(query, [userId, JSON.stringify(updatedVehicles)]);

            return { message: 'Vehicle added successfully', vehicleId: result.rows[0].id };
        } catch (error) {
            console.error('Error uploading vehicle:', error);
            return { error: 'Internal server error' };
        }
    }
}