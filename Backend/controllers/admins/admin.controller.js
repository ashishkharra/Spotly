const { responseData } = require('../../helpers/responseData')
const adminService = require('../../services/admins/admin.services.js')
module.exports = {
  logout: async (req, res) => {
    try {
      const id = req?.user?.id
      console.log("Admin Logout ID:", req.user);
      const result = await adminService.logout(id)
      return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success))
    } catch (error) {
      return res.status(500).json(responseData('SERVER_ERROR', { error: error.message }, req, false))
    }
  },
  adminLogin: async (req, res) => {
    try {
      const result = await adminService.adminLogin(req)
      return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success))
    } catch (error) {
      return res.status(500).json(responseData('SERVER_ERROR', { error: error.message }, req, false))
    }
  },
  rememberMe: async (req, res) => {
    try {
      const result = await adminService.validateRememberToken(req.body)
      return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success))
    } catch (error) {
      return res.status(500).json(responseData('SERVER_ERROR', { error: error.message }, req, false))
    }
  },
  adminProfile: async (req, res) => {
    try {
      const result = await adminService.adminProfile()
      return res.status(result?.statusCode).json(responseData(result?.message, result?.results, req, result?.success))
    } catch (error) {
      return res.status(500).json(responseData('SERVER_ERROR', { error: error.message }, req, false))
    }
  },
  adminForgotPassword: async (req, res) => {
    try {
      await adminService.adminForgotPassword(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  },
  adminResetPassword: async (req, res) => {
    try {
      await adminService.adminResetPassword(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  },
  changePassword: async (req, res) => {
    try {
      await adminService.changePassword(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  },
  editAdmin: async (req, res) => {
    try {
      await adminService.editAdmin(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  },
  changeStatus: async (req, res) => {
    try {
      await adminService.changeStatus(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  },
  generatePresignedURL: async (req, res) => {
    try {
      await adminService.generatePresignedURL(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  },
  countryList: async (req, res) => {
    try {
      await adminService.countryList(req, res)
    } catch (err) {
      const msg = err.message || 'SOMETHING_WENT_WRONG'
      return res.status(422).json(responseData(msg, {}, req, false))
    }
  }
}
