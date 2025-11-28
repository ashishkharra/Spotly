const bcrypt = require('bcryptjs')
const User = require('../../models/user/user.schema.js');
const RefreshToken = require('../../models/token/refreshToken.schema.js')
const { cleanObject } = require('../../helpers/helper.js');
module.exports = {

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