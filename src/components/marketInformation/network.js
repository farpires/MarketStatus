const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controllers");

router.get("/fetchTicker", async function (req, res) {
  try {
    result = await controller.fetchTicker(req.body.currencyPair);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});
router.get("/marketOrder", async function (req, res) {
  try {
    const { currencyPair, type, amount } = req.body;
    result = await controller.marketOrder(currencyPair, type, amount);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});

router.get("/changeCurrencyToDollar", async function (req, res) {
  try {
    const { currencyPair, type, amount } = req.body;
    result = await controller.changeCurrency(currencyPair, type, amount);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});

module.exports = router;
