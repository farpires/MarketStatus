'use strict'
const express = require('express');
const app = express();

app.use('/', function(req,res){
    res.send('hi challenge')
});

app.listen(3000);
