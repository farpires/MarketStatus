"use strict";
const express = require("express");
const router = require("./src/network/routes");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const socket = require("./socket");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
router(app);
socket.connect(server);

module.exports = server;
