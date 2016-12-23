// Automotive.lk Application

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Routers
var product = require('./routes/product');
var users = require('./routes/users');
var cart = require('./routes/cart');

// Routing
app.use('/product', product);   
app.use('/users', users); 
app.use('/cart', cart); 


// Test Mongose connection..
var mongoose = require('mongoose');
//var assert = require('assert');

var url = 'mongodb://localhost:27017/AutomotiveLk';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.on('open', function(){
    console.log('Connected');
});



app.listen(3000);
console.log("Automotive.lk running on port 3000");