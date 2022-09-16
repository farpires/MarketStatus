const { BITFINEX_WEBSOCKET } = require("../config");

function orderBook(currencyPair) {
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
  
      if (!currencyPair) {
        console.error("[Services.bitfinex.js] REQUIRED_FIELD ");
        reject("The field amount is required");
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
          let asks = book[1].slice(25, book[1].length);
          let result = {
            pair: pair,
            bid: bids[bids.length - 1][1],
            bidAmount: bids[bids.length - 1][2],
            bidCount: bids[bids.length - 1][0],
            ask: asks[0][1],
            askAmount:(- asks[0][2]),
            askCount: asks[0][0],
          };
          w.on("close", function name() {
            console.log("disconnected");
          });
          flag = true;
          resolve(result);
        }
      });
    });
  }
  
  module.exports = {
    orderBook,
  };