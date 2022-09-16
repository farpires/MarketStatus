if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    BITFINEX_WEBSOCKET: process.env.BITFINEX_WEBSOCKET,
    DOMAIN: process.env.DOMAIN,
    MONGO_DB: {
        port: process.env.MONGO_DB_PORT,
        host: process.env.MONGO_DB_HOST
    },
    REDIS:{

    },
    EMAIL:{
        
    }
}