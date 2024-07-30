const bodyParser = require('body-parser');
const { tradeOrder } = require('../ApiRequest/tradeOrder');

const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

const handleWebhook = async (req, res) => {
    try {
        const data = req.body;
        console.log('Received webhook data:', data);

        // Procesa los datos del webhook
        if (data.set === "trade") {
            const symbol = data.symbol;
            const side = data.side;
            let positionSide;
            const type = "MARKET";    
            if (side === "BUY") {
                positionSide = "LONG";  
            } else {
                positionSide = "SHORT";
            }    
            // Ejecutar la orden en el broker
            await tradeOrder(symbol, side, positionSide, type);
        }

        // Responder a TradingView
        res.status(200).json({ status: 'success' , data});
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }

};

module.exports = {
    handleWebhook
};

/*const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { tradeOrder } = require('../ApiRequest/tradeOrder');

const app = express();
const port = 443; // Puerto en el que el servidor escuchará

async function listener() {
    // Middleware para analizar el cuerpo de la solicitud en formato JSON
    app.use(bodyParser.json());

    // Endpoint para recibir el webhook
    app.post('/api/webhook', async (req, res) => {
        try {
            const data = req.body;
            console.log('Received webhook data:', data);

            // Procesa los datos del webhook
            if (data.set === "trade") {
                const symbol = data.symbol;
                const side = data.side;
                let positionSide;
                const type = "MARKET";    
                if(side === "BUY"){
                    positionSide = "LONG";  
                }else{
                    positionSide = "SHORT";
                }    
                // Ejecutar la orden en el broker
                tradeOrder(symbol, side, positionSide, type);
            }

            // Responder a TradingView
            res.status(200).json({ status: 'success' });
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.status(500).json({ status: 'error', message: error.message });
        }
    });

    // Inicia el servidor
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = {
    listener
  };*/