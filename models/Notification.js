const mongoose = require('mongoose');

const NotificationSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

      channel: {
        type: String,
        enum: [
          'APP',
          'WHATSAPP',
          'EMAIL',
          'SMS'
        ]
      },

      category: {
        type: String,
        enum: [
          'PROPERTY_APPROVED',
          'PROPERTY_REJECTED',
          'NEW_APPLICANT',
          'APPLICATION_ACCEPTED',
          'APPLICATION_REJECTED'
        ]
      },

      title: String,

      message: String,

      status: {
        type: String,
        enum: [
          'PENDING',
          'SENT',
          'FAILED'
        ],
        default: 'PENDING'
      }
    },
    {
      timestamps: true
    }
  );

module.exports = mongoose.model('Notification', NotificationSchema);