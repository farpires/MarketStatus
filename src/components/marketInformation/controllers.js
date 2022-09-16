const { orderBook } = require("../../services/bitfinex.orderBook");
const { marketSellOrder, marketBuyOrder } = require("../../services/bitfinex.orderMarket");
const { sellCurrencyForDollar, buyCurrencyForDollar } = require("../../services/bitfinex.change");

const socket = require("../../../socket").socket;

module.exports = {

    async fetchTicker(currencyPair) {
        try {
            if (!currencyPair) {
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field currencyPair is required');
            }
            if(currencyPair !== 'BTC-USD' && currencyPair !== 'ETH-USD' ) {
                console.error('[marketinformation.controllers] INVALIDAD_CURRENCYPAIR_ERROR');
                throw Error('It is only available for these two pairs: BTC-USD and ETH-USD');
            }
          
            const result = await orderBook(currencyPair.replace('-',''));
            socket.io.emit('fetchTicker',result);           
            return result;
        } catch (error) {
            throw Error(error);
        }
    },



    async marketOrder(currencyPair,type,amount){   
        try {
            if(!currencyPair){
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field currencyPair is required');
            }
            if(!type){
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field type is required');
            }
            if(!amount){
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field amount is required');
            }
 
            if(type.toUpperCase() !== 'SELL' && type.toUpperCase() !== 'BUY' ){
                console.error('[marketinformation.controllers] INVALIDAD_TYPE_ERROR');
                throw Error('Only these two types are available: SELL o BUY');
            }
            if(currencyPair !== 'BTC-USD' && currencyPair !== 'ETH-USD' ) {
                console.error('[marketinformation.controllers] INVALIDAD_CURRENCYPAIR_ERROR');
                throw Error('It is only available for these two pairs: BTC-USD and ETH-USD');
            }

            if (type.toUpperCase() === 'SELL') {
                const result = await marketSellOrder(currencyPair.replace('-',''),type,amount);
                socket.io.emit('marketSellOrder',result);
                return result;
            }
            if (type.toUpperCase() === 'BUY') {
                const result = await marketBuyOrder(currencyPair.replace('-',''),type,amount);
                socket.io.emit('marketBuyOrder',result);
                return result;
            }
        } catch (error) {
            throw Error(error);
        }
       
    },

    async changeCurrency(currencyPair,type,amount){
        try {
            if(!currencyPair){
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field currencyPair is required');
            }
            if(!type){
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field type is required');
            }
            if(!amount){
                console.error('[marketinformation.controllers] REQUIRED_FIELD');
                throw Error('The field amount is required');
            }
 
            if(type.toUpperCase() !== 'SELL' && type.toUpperCase() !== 'BUY' ){
                console.error('[marketinformation.controllers] INVALIDAD_TYPE_ERROR');
                throw Error('Only these two types are available: SELL o BUY');
            }
            if(currencyPair !== 'BTC-USD' && currencyPair !== 'ETH-USD' ) {
                console.error('[marketinformation.controllers] INVALIDAD_CURRENCYPAIR_ERROR');
                throw Error('It is only available for these two pairs: BTC-USD and ETH-USD');
            }

            if (type.toUpperCase() === 'SELL') {
                const result = await sellCurrencyForDollar(currencyPair.replace('-',''),type,amount);
                socket.io.emit('sellCurrencyForDollar',result);
                return result;
            }
            if (type.toUpperCase() === 'BUY') {
                const result = await buyCurrencyForDollar(currencyPair.replace('-',''),type,amount);
                socket.io.emit('buyCurrencyForDollar',result);
                return result;
            }
        } catch (error) {
            throw Error(error);
        }
       
    },

}