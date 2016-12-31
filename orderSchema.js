// Automotive.lk Application

var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    email : {
        type: String,
        require: true,
        unique: false        
    },
    name : {
        type: String,
        require: true,
        unique: false        
    },
    date : {
        type: String,
        require: true,
        unique: false        
    },
    total : {
        type: Number,
        require: true,
        unique: false        
    }
}); 

module.exports = mongoose.model('orderModel', orderSchema, 'orderModel');


