const app = require("../server");
const request = require("supertest");

describe("GET /marketOrder", () => {
  it("Should THROW ERROR when you want to enter a currencyPair with invalid value", (done) => {
    const data = {
      currencyPair: "DOGE..USD",
      type: "BUY",
      amount: 3000,
    };
    request(app)
      .get("/marketOrder")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        '{"message":"Error: It is only available for these two pairs: BTC-USD and ETH-USD"}'
      )
      .end((err) => {
        if (err) return done(err);
        done();
      });
  }),
    it("Should THROW ERROR when you want to enter a currencyPair with null value", (done) => {
      const data = {
        currencyPair: null,
        type: "BUY",
        amount: 3000,
      };
      request(app)
        .get("/marketOrder")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('{"message":"Error: The field currencyPair is required"}')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

  it("Should THROW ERROR when you want to enter a type with null value", (done) => {
    const data = {
      currencyPair: "ETH-USD",
      type: null,
      amount: 3000,
    };
    request(app)
      .get("/marketOrder")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('{"message":"Error: The field type is required"}')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("Should THROW ERROR when you want to enter a type with invalid value", (done) => {
    const data = {
      currencyPair: "ETH-USD",
      type: "TO_BUY",
      amount: 3000,
    };
    request(app)
      .get("/marketOrder")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        '{"message":"Error: Only these two types are available: SELL o BUY"}'
      )
      .end((err) => {
        if (err) return done(err);
        done();
      });
  }),
    it("Should THROW ERROR when you want to enter a amount with null value", (done) => {
      const data = {
        currencyPair: "ETH-USD",
        type: "BUY",
        amount: null,
      };
      request(app)
        .get("/marketOrder")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .expect('{"message":"Error: The field amount is required"}')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });

  it("Should respond with json and status 200", (done) => {
    const data = {
      currencyPair: "BTC-USD",
      type: "BUY",
      amount: 3000,
    };
    request(app)
      .get("/fetchTicker")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
