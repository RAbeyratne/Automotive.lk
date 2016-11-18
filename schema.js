// Automotive.lk Application

var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    fName : {
        type: String,
        require: true,
        unique: false        
    },
    dateOfBirth : {
        type: String,
        require: true,
        unique: false        
    },
    email : {
        type: String,
        require: true,
        unique: true        
    },
    password : {
        type: String,
        require: true,
        unique: false        
    }
}); 


var userModel = mongoose.model('userModel', userSchema);
module.export = userModel;