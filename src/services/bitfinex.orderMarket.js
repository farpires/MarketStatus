const { BITFINEX_WEBSOCKET } = require("../config");

function marketSellOrder(currencyPair, type, amount){
    const ws = require("ws");
    const w = new ws(BITFINEX_WEBSOCKET);
  
    return new Promise((resolve, reject) => {
      let msg = JSON.stringify({
        event: "subscribe",
        channel: "book",
        prec: "R0",
        freq: "F0",
        symbol: `${currencyPair}`,
      });
      w.on("open", () => w.send(msg));
      if (!currencyPair || !type || !amount) {
        console.error("[Services.bitfinex.js] REQUIRED_FIELD ");
        reject("the fields  is required");
      }
  
      let book;
      let pair;
      let channel;
      let symbol;
      let flag = false;
      w.on("message", (msg) => {
        book = JSON.parse(msg);
        if (book.event === "info") return;
        if (book.event === "subscribed") {
          pair = book.pair;
          channel = book.channel;
          symbol = book.symbol;
          return;
        }
        if (book.event === "info") return;
        if (book[1] === "hb") return;
        if (!flag) {
          let bids = book[1].slice(undefined, 25);
          let effectivePrice = {
            pair: pair,
            type: type,
            amountToTrade: "",
            conversionResult:"",
            maxSizeOrder:[]
          };
          let accumulatedAmount = amount;
          let accumulatedValueBase = 0;
          let maxSize = 0;
          const bidsPrices = bids.reverse();
          for (const bidPrice of bidsPrices) {
            let bid = bidPrice[1];
            let bidAmount = bidPrice[2];
            let coinAmount = accumulatedAmount/bid;
            let result = bidAmount-coinAmount;
            if (maxSize < bidAmount) {
              maxSize = bidAmount
              effectivePrice.maxSizeOrder[0]={
                pair: pair,
                type: type,
                bid: bidPrice[1],
                bidAmount: bidPrice[2],
                bidCount: bidPrice[0]
              };
            }
            if(result >= 0){
              accumulatedValueBase = accumulatedValueBase + coinAmount;
              effectivePrice.conversionResult= accumulatedValueBase;
              effectivePrice.amountToTrade = amount;
              break
            } else {
              accumulatedValueBase = accumulatedValueBase + bidAmount;
              accumulatedAmount =(- result)*bid;
            }
          }
          w.on("close", function name() {
            console.log("disconnected");
          });
          flag = true;
          resolve(effectivePrice);
        }
      });
    });
  }
  
  function marketBuyOrder(currencyPair, type, amount){
    const ws = require("ws");
    const w = new ws(BITFINEX_WEBSOCKET);
  
    return new Promise((resolve, reject) => {
      let msg = JSON.stringify({
        event: "subscribe",
        channel: "book",
        prec: "R0",
        freq: "F0",
        symbol: `${currencyPair}`,
      });
      w.on("open", () => w.send(msg));
  
      if (!currencyPair || !type || !amount) {
        console.error("[Services.bitfinex.js] REQUIRED_FIELD ");
        reject("the fields  is required");
      }
      let book;
      let pair;
      let channel;
      let symbol;
      let flag = false;
      w.on("message", (msg) => {
        book = JSON.parse(msg);
        if (book.event === "info") return;
        if (book.event === "subscribed") {
          pair = book.pair;
          channel = book.channel;
          symbol = book.symbol;
          return;
        }
        if (book.event === "info") return;
        if (book[1] === "hb") return;
        if (!flag) {
          let asksPrices = book[1].slice(25, book[1].length);
          let effectivePrice = {
            pair: pair,
            type: type,
            amountToTrade: "",
            conversionResult: "",
            maxSizeOrder:[]
          };
          let accumulatedAmount = amount;
          let accumulatedValueBase = 0;
          let maxSize= 0;
          for (const askPrice of asksPrices) {
            let ask = askPrice[1];
            let askAmount = (- askPrice[2]);
            let coinAmount = accumulatedAmount/ask;
            let result = askAmount-coinAmount;
            if (maxSize < askAmount) {
              maxSize = askAmount
              effectivePrice.maxSizeOrder[0]={
                pair: pair,
                type: type,
                ask: askPrice[1],
                askAmount:(- askPrice[2]),
                askCount: askPrice[0]
              };
            }
            if(result >= 0){
              accumulatedValueBase = accumulatedValueBase + coinAmount;
              effectivePrice.conversionResult= accumulatedValueBase;
              effectivePrice.amountToTrade = amount;
              break
            } else {
              accumulatedValueBase = accumulatedValueBase + askAmount;
              accumulatedAmount =(- result)*ask;
            }
          }
          w.on("close", function name() {
            console.log("disconnected");
          });
          flag = true;
          resolve(effectivePrice);
        }
      });
    });
  }

  module.exports = {
    marketBuyOrder,
    marketSellOrder
  };
  