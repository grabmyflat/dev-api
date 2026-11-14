const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    propertyId: {
      type: String,
      required: true,
      unique: true
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: String,

    propertyType: {
      type: String,
      enum: [
        'FLAT',
        'APARTMENT',
        'INDEPENDENT_HOUSE',
        'VILLA',
        'PG'
      ]
    },

    configuration: {
      type: String,
      enum: [
        '1RK',
        '1BHK',
        '2BHK',
        '3BHK',
        '4BHK'
      ]
    },

    furnishing: {
      type: String,
      enum: [
        'FULLY_FURNISHED',
        'SEMI_FURNISHED',
        'UNFURNISHED'
      ]
    },

    occupancy: {
      type: String,
      enum: ['VACANT', 'OCCUPIED'],
      default: 'VACANT'
    },

    preferredTenant: {
      type: String,
      enum: [
        'ANY',
        'BACHELOR',
        'FAMILY',
        'MALE',
        'FEMALE'
      ],
      default: 'ANY'
    },

    rent: {
      type: Number,
      required: true
    },

    securityDeposit: Number,

    maintenanceCost: Number,

    availableFrom: Date,

    amenities: [String],

    address: {
      state: String,
      city: String,
      locality: String,
      pincode: String,
      addressLine: String
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },

      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },

    images: [
      {
        publicId: String,
        url: String
      }
    ],

    status: {
      type: String,
      enum: [
        'DRAFT',
        'ACTIVE',
        'INACTIVE',
        'RENTED',
        'DELETED'
      ],
      default: 'ACTIVE'
    },

    views: {
      type: Number,
      default: 0
    },

    applicants: {
      type: Number,
      default: 0
    },

    favorites: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

PropertySchema.index({ propertyId: 1 });
PropertySchema.index({ ownerId: 1 });
PropertySchema.index({ 'address.city': 1 });
PropertySchema.index({ rent: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Property', PropertySchema);