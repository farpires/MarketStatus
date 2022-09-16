const app = require("../server");
const request = require("supertest");

describe("GET /fetchTicker", () => {
  it("Should THROW ERROR when you want to enter a currencyPair with invalid value", (done) => {
    const data = {
      currencyPair: "ETHUSD",
    };
    request(app)
      .get("/fetchTicker")
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
      };
      request(app)
        .get("/fetchTicker")
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

  it("Should respond with json and status 200", (done) => {
    const data = {
      currencyPair: "ETH-USD",
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
