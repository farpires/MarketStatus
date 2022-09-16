const server = require("./app");
const { PORT } = require("./src/config");

server.listen(PORT, async () => {
  console.log("Server run in ", PORT);
});


module.exports=server;