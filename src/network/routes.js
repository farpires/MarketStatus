const marketInformation = require("../components/marketInformation/network");

const routes = function (server) {
  server.use("/", marketInformation);
};

module.exports = routes;
