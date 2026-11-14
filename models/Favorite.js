const mongoose = require('mongoose');

const FavoriteSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
      }
    },
    {
      timestamps: true
    }
  );

FavoriteSchema.index({
  userId: 1,
  propertyId: 1
});

module.exports = mongoose.model('Favorite', FavoriteSchema);