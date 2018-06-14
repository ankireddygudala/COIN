var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://localhost:27017/nobos-affiliate');

//Get the default connection
var db = mongoose.connection;
// mongoose.set('bufferCommands', false);

//Bind connection to error event (to get notification of connection errors)
db.on('connection', function () {
    console.log("Connected to database!");
})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = {mongoose};