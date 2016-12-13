// Automotive.lk Application

var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    pid: {
        type: Number,
        require: true,
        unique: true        
    },
    productName : {
        type: String,
        require: true,
        unique: false        
    },
    category : {
        type: String,
        require: true,
        unique: false        
    },
    description : {
        type: String,
        require: false,
        unique: false        
    },
    price : {
        type: Number,
        require: true,
        unique: false        
    }
}); 

module.exports = mongoose.model('productModel', productSchema, 'productModel');