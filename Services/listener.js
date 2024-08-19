const bodyParser = require('body-parser');
const { tradeOrderFutures } = require('../ApiRequest/tradeOrderFutures');
const { tradeOrderSpot } = require('../ApiRequest/tradeOrderSpot');

const express = require('express');
const app = express();

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

const handleWebhook = async (req, res) => {
    try {
        const data = req.body;
        console.log('Received webhook data:', data);

        // Procesa los datos del webhook
        if (data.set === "Futuros") {
            const symbol = data.symbol;
            const side = data.side;
            let positionSide;
            const type = "MARKET";    
            if (side === "BUY") {
                positionSide = "LONG";  
            } else {
                positionSide = "SHORT";
            }    
            await tradeOrderFutures(symbol, side, positionSide, type);
            /*
            armar payload, creo que habria que mandarle la cantidad tambien.
            */
        } 
        else if (data.set === "Spot") {
            const symbol = data.symbol;
            const side = data.side;
            const type = data.type;
            const quantity = data.quantity;
            await tradeOrderSpot(symbol, side, type, quantity);

            /*
            ejemplo de payload:
            {
                "set":"Spot",
                "symbol": "BTC-USDT",
                "side": "BUY",
                "type": "MARKET",
                "quantity" : "0.0016"
            }
            */
        }
        else{
        console.log("Falta especificar que tipo de set enviamos");
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