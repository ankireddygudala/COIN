const express = require('express');
var http = require('http');
var cors = require('cors');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;

const userRoutes = require('./server/api/user/userController');
const contractApi = require('./server/api/eth/contractApi');

// rest api to handle user requests
app.use('/api/user', userRoutes);

app.use(cors());

app.use('/api/eth', contractApi);






server.listen(port, function () {
    console.log("Server started and listening on port: ",port);
});
module.exports = { app };
