const User = require('../models/User');

/**
 * Get Profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.user.userId
    }).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get Profile Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch profile'
    });
  }
};

/**
 * Save Profile
 * Initial profile completion after registration
 */
exports.saveProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      occupation,
      company
    } = req.body;

    const user = await User.findOne({
      userId: req.user.userId
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.fullName = `${firstName || ''} ${lastName || ''}`.trim();
    user.email = email;
    user.gender = gender;
    user.occupation = occupation;
    user.company = company;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile saved successfully',
      data: user
    });

  } catch (error) {
    console.error('Save Profile Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to save profile'
    });
  }
};

/**
 * Update Profile
 * Partial profile update
 */
exports.updateProfile = async (req, res) => {
  try {

    const updateData = { ...req.body };

    if (
      updateData.firstName !== undefined ||
      updateData.lastName !== undefined
    ) {
      updateData.fullName =
        `${updateData.firstName || ''} ${updateData.lastName || ''}`.trim();
    }

    const user = await User.findOneAndUpdate(
      {
        userId: req.user.userId
      },
      {
        $set: updateData
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update Profile Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to update profile'
    });
  }
};