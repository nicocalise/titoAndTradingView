const { handleWebhook } = require('../Services/listener');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await handleWebhook(req, res);
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};