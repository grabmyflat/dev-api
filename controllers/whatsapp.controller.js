const verifyWebhook = (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (!mode || !token) {
        return res.status(400).json({
            success: false,
            message: 'Missing webhook parameters'
        });
    }

    if (
        mode === 'subscribe' &&
        token === process.env.WHATSAPP_VERIFY_TOKEN
    ) {
        console.log('✅ WhatsApp Webhook Verified');
        return res.status(200).send(challenge);
    }

    console.error('❌ WhatsApp Webhook Verification Failed');
    return res.sendStatus(403);
};

const handleWebhookEvent = async (req, res) => {
    try {
        const body = req.body;

        if (body.object !== 'whatsapp_business_account') {
            return res.sendStatus(404);
        }

        body.entry?.forEach(entry => {
            entry.changes?.forEach(change => {
                const value = change.value;

                if (value.messages) {
                    value.messages.forEach(message => {
                        console.log('\n📩 Incoming WhatsApp Message');
                        console.log('From:', message.from);
                        console.log('Type:', message.type);

                        if (message.text) {
                            console.log('Message:', message.text.body);
                        }
                    });
                }

                if (value.statuses) {
                    value.statuses.forEach(status => {
                        console.log('\n📬 Message Status');
                        console.log('Recipient:', status.recipient_id);
                        console.log('Status:', status.status);
                    });
                }
            });
        });

        return res.sendStatus(200);
    } catch (error) {
        console.error('❌ Webhook Error:', error);
        return res.sendStatus(500);
    }
};

module.exports = {
    verifyWebhook,
    handleWebhookEvent
};