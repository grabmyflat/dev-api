const axios = require('axios');

class WhatsAppService {
  constructor() {
    this.baseUrl = `https://graph.facebook.com/v23.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
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

  async sendOTP(to, otp) {
    return this.sendTextMessage(
      to,
      `Your GrabMyFlat OTP is ${otp}. Valid for 10 minutes. Do not share it with anyone.`
    );
  }

  async sendTemplateMessage(to, templateName, language = 'en_US', components = []) {
    return axios.post(
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
      { headers: this.headers }
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