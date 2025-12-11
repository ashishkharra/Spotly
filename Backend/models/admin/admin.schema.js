const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: 'admin'
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // Profile
  profile_image: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=spotly'
  },
  role: {
    type: String,
    enum: ['Admin'],
    default: 'Admin'
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  flag: {
    type: Number,
    default: 0,
  },

  forceLogout: {
    type: Boolean,
    default: false
  },
  // Settings
  remember_me_enabled: {
    type: Boolean,
    default: true
  },
  remember_me_tokens: [{
    token: String,
    expires_at: Date,
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  tokenVersion: 0,

  // Simple login tracking
  last_login: Date,
  last_activity: Date,
  login_count: {
    type: Number,
    default: 0
  },

  // Basic timestamps
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

AdminSchema.methods.generateRememberToken = function () {
  const token = require('crypto').randomBytes(32).toString('hex');
  const expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  this.remember_me_tokens.push({
    token,
    expires_at,
    created_at: new Date()
  });

  if (this.remember_me_tokens.length > 5) {
    this.remember_me_tokens = this.remember_me_tokens.slice(-5);
  }

  return { token, expires_at };
};

AdminSchema.methods.validateRememberToken = function (token) {
  const tokenData = this.remember_me_tokens.find(t => t.token === token);

  if (!tokenData || tokenData.expires_at < new Date()) {
    return false;
  }

  return true;
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin