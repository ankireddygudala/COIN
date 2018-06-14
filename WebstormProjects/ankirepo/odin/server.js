const express = require('express');
const http = require('http');
const path = require('path');
const Web3 = require('web3');
const socketIo = require('socket.io');
var process = require('process');


// const {generateMessage,generateLocationMessage} = require('./server/utils/generateMessage');
// const validator = require('./server/utils/validation');
// const {Users} = require('./server/utils/Users');

const {web3Connection} = require('./server/web3-connection');

const publicPath = path.join(process.cwd(),'/public');

var port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIo(server).listen(server);
var web3 = new Web3();
// app.use(express.static(publicPath));



io.on('connection', function (socket) {
    console.log('dfasdfa');
    socket.on('connecting',function (x) {
        console.log("gaaaaaaaaaa");
    })
});

app.get('/',function (req, res) {
    res.sendFile(path.join(publicPath + '/index.html'));

});

process.on('beforeExit', function () {
    console.log('Process exit!');
});
server.listen(port,function () {
    console.log("Server listening on port :",port);
});

