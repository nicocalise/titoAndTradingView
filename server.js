const express = require('express');
const bodyParser = require('body-parser');
const { handleWebhook } = require('./Services/listener');

const app = express();
const port = 443;

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

// Definir el endpoint webhook
app.post('/webhookFutures', async (req, res) => {
  try {
    await handleWebhook(req, res);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/webhookSpot', async (req, res) => {
  try {
    await handleWebhook(req, res);
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});