const CryptoJS =require("crypto-js");
const axios = require('axios');
require('dotenv').config();

const tradeOrderFutures = (symbol, side, positionSide, type) => {
    const API_KEY = process.env.BINGX_API_KEY;
    const API_SECRET = process.env.BINGX_SECRET_KEY
    const HOST = "open-api.bingx.com"
    const API = {
        "uri": "/openApi/swap/v2/trade/order",
        "method": "POST",
        "payload": {
            "symbol": symbol,
            "side": side,
            "positionSide": positionSide,
            "type": type,
            "quantity": 0.00147,
            //"takeProfit": "{\"type\": \"TAKE_PROFIT_MARKET\", \"stopPrice\": 31968.0,\"price\": 31968.0,\"workingType\":\"MARK_PRICE\"}",
            "leverage": "5",
        },
        "protocol": "https"
    }
    async function main() {
        await bingXOpenApiTest(API.protocol, HOST, API.uri, API.method, API_KEY, API_SECRET)
    }
    function getParameters(API, timestamp, urlEncode) {
        let parameters = ""
        for (const key in API.payload) {
            if (urlEncode) {
                parameters += key + "=" + encodeURIComponent(API.payload[key]) + "&"
            } else {
                parameters += key + "=" + API.payload[key] + "&"
            }
        }
        if (parameters) {
            parameters = parameters.substring(0, parameters.length - 1)
            parameters = parameters + "&timestamp=" + timestamp
        } else {
            parameters = "timestamp=" + timestamp
        }
        return parameters
    }

    main().catch(console.err);
    async function bingXOpenApiTest(protocol, host, path, method, API_KEY, API_SECRET) {
        const timestamp = new Date().getTime()
        const sign = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(getParameters(API, timestamp), API_SECRET))
        const url = protocol+"://"+host+path+"?"+getParameters(API, timestamp, true)+"&signature="+sign
        console.log("protocol:", protocol)
        console.log("method:", method)
        console.log("host:", host)
        console.log("path:", path)
        console.log("parameters:", getParameters(API, timestamp))
        console.log("sign:", sign)
        console.log("apiKey", API_KEY)
        console.log(method, url)
        const config = {
            method: method,
            url: url,
            headers: {
                'X-BX-APIKEY': API_KEY,
            },
            transformResponse: (resp) => {
                console.log(resp); 
                return resp;
            }   
        };
        try {
            const resp = await axios(config);
            console.log("Response status:", resp.status);
            console.log("Response data:", resp.data);
        } catch (error) {
            console.error("API request error:", error.response ? error.response.data : error.message);
        }
    }
}

module.exports = {
    tradeOrderFutures
};