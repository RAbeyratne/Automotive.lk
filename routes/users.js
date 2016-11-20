var express = require('express');
var router = express.Router();
var userModel = require('../schema');
var bodyParser = require('body-parser');

// Sign in process
router.post('/userAuthentication', function (req, res) {
    console.log(req.body);
    res.send('User authentication data recieved');    
});

// Sign up process
router.post('/userRegistration', function (req, res) {    
    userModel.find({ email: req.body.email }, function(err, data) {
        if (err){
            throw err;
        }
        
        console.log(data.length);
        var result;
        if (data.length > 0){
            // Email address of new user already exists
            result = 'ERROR : USER EXISTS'; 
            res.send('User email already exists');
        } else {
            // Saving a new user            
            console.log('New User details >>> ' + JSON.stringify(req.body));
            
            var newUser = userModel({
                fName : req.body.fName,
                dateOfBirth : req.body.date,
                email : req.body.email,
                password : req.body.password
            });

            newUser.save(function(err){
                if(err){
                    res.send(err);
                    throw err;
                }

                userModel.find({}, function(err, data){
                    if (err){
                        res.send(err);
                        throw err;
                    } else {
                        console.log(data);
                        res.send('User saved');
                        result = 'SAVED RECORD';
                    }
                });    
            });   
        }
        console.log('RESULT >> ' + result);        
    });
});

console.log('User Router Active');
module.exports = router;