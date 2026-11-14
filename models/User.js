const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      trim: true
    },

    fullName: {
      type: String
    },

    email: {
      type: String,
      lowercase: true,
      trim: true
    },

    mobile: {
      type: String,
      required: true,
      unique: true
    },

    profileImage: {
      publicId: String,
      url: String
    },

    role: {
      type: String,
      enum: ['OWNER', 'TENANT', 'ADMIN'],
      default: 'TENANT'
    },

    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER']
    },

    occupation: String,

    company: String,

    // Membership Details
    membership: {
      type: String,
      enum: ['FREE', 'PREMIUM'],
      default: 'FREE'
    },

    membershipStartDate: Date,

    membershipEndDate: Date,

    isMembershipActive: {
      type: Boolean,
      default: false
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'BLOCKED'],
      default: 'ACTIVE'
    },

    lastLoginAt: Date
  },
  {
    timestamps: true
  }
);

UserSchema.index({ mobile: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ userId: 1 });
UserSchema.index({ membership: 1 });

module.exports = mongoose.model('User', UserSchema);