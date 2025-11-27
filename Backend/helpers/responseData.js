const _ = require('multi-lang')('lang.json')
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model')
const RefreshToken = require('../models/token/refreshToken.schema.js')

module.exports = {
  responseData: (message, result, req, success) => {
    const language = req.headers['language'] ? req.headers['language'] : 'en'
    let response = {}
    response.success = success
    response.message =
      _(message, language) || _('SOMETHING_WENT_WRONG', language)
    response.results = result
    return response
  },
  setMessage: (message, language) => {
    return __(message, language)
  },
  generateAuthToken: async (user, req) => {
    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
        tokenVersion: user.tokenVersion
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_LIFE }
    );

    const refreshTokenPlain = crypto.randomBytes(40).toString("hex");

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshTokenPlain)
      .digest("hex");

    await RefreshToken.create({
      userId: user.id,
      tokenHash: refreshTokenHash,
      device: req?.headers["x-device"] || "unknown",
      ip: req?.ip,
      userAgent: req?.headers["user-agent"],
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    });

    return {
      accessToken,
      refreshToken: refreshTokenPlain
    };
  },
  generateUniqueUserId: () => {
    const randomUserId = Math.floor(Math.random() * 1000000)
    return randomUserId.toString()
  },
  handleSocialIdExist: (req, res) => {
    return res.json(responseData('SOCIAL_ID_EXIST', {}, req, false))
  }
}


