const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.baseUrl = `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    this.headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    };
  }

  async sendTextMessage(to, message) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: {
            body: message
          }
        },
            { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error(
            'WhatsApp Error:',
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async sendTemplateMessage(to, templateName, language = 'en_US', components = []) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          messaging_product: 'whatsapp',
          to,
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: language
            },
            components
          }
        },
        {
          headers: this.headers
        }
      );

      return response.data;

    } catch (error) {
      console.error(
        'WhatsApp Template Error:',
        error.response?.data || error.message
      );

      throw error;
    }
  }

  /**
   * Send OTP using approved WhatsApp template
   *
   * Template Example:
   * Name: grabmyflat_otp
   *
   * Message:
   * Your GrabMyFlat OTP is {{1}}
   * Valid for 10 minutes.
   */
  async sendOTP(to, otp) {
    return this.sendTemplateMessage(
      to,
      'jaspers_market_order_confirmation_v1',
      'en_US',
      [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: otp
            }
          ]
        }
      ]
    );
  }

  async sendPropertyAlert(to, property) {
    return this.sendTextMessage(
      to,
      `🏠 New Property Available

Title: ${property.title}
Location: ${property.location}
Rent: ₹${property.rent}

Visit GrabMyFlat for more details.`
    );
  }

  async sendEnquiryNotification(to, enquiry) {
    return this.sendTextMessage(
      to,
      `📢 New Enquiry

Property: ${enquiry.propertyName}
Name: ${enquiry.userName}
Mobile: ${enquiry.mobile}

Please contact the customer.`
    );
  }
}

module.exports = new WhatsAppService();