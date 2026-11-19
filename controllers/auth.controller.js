const whatsappService = require('../services/whatsapp.service');

const otpStore = new Map();

const sendOTP = async (req, res) => {
  try {
    console.log('Send OTP Request:', req.body);

    const { mobile } = req.body;

    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    console.log('Generated OTP:', otp);

    await whatsappService.sendOTP(mobile, otp);

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Send OTP Error:', error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const verifyOTP = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        const savedOtp = otpStore.get(mobile);

        if (savedOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        otpStore.delete(mobile);

        const token = jwt.sign(
            {
                mobile
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '30d'
            }
        );

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { sendOTP, verifyOTP };