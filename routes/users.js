var express = require('express');
var router = express.Router();
var userModel = require('../userSchema');
var bodyParser = require('body-parser');
var session = require('express-session');
var globals = require('../globals'); 

router.use(session({secret:'ydfuisyfviusydgvi1ugnlk', resave:false, saveUninitialized:true}));


// Sign in process
router.post('/userAuthentication', function (req, res) {    
    if (!globals.sessionData){ 
        // Session data is not found in the server side
        console.log('New User details >>> ' + JSON.stringify(req.body));
        userModel.find({ email: req.body.email, password : req.body.password }, function(error, data) {
            if (error){
                res.status(500).send(error);    
                throw error;
            }                

            if (data.length > 0){
                // Username and password match + adding the user to the session
                req.session.user = data;
                globals.sessionData = data;

                res.status(200).send('Authentication successful.');     
            } else {
                // Username and password mismatch
                res.status(400).send('Authentication details invalid.'); 
            }
        });        

    } else {
        // Session data is available in the server side
        console.log('Session data already exists');
        res.status(409).send('User already logged in.'); 
    }    
});


// Sign up process
router.post('/userRegistration', function (req, res) {    
    userModel.find({ email: req.body.email }, function(error, data) {
        if (error){
            res.status(500).send(error);    
            throw error;      
        }
        
        console.log(data.length);
        var result;
        if (data.length > 0){
            // Email address of new user already exists
            res.status(409).send('User email already exists.');
        } else {
            // Saving a new user            
            console.log('New User details >>> ' + JSON.stringify(req.body));
            
            var newUser = userModel({
                fName : req.body.fName,
                dateOfBirth : req.body.date,
                email : req.body.email,
                password : req.body.password
            });

            newUser.save(function(error){
                if(error){
                    res.status(500).send(error);    
                    throw error;
                } else {
                    userModel.find({}, function(error, data){
                        if (error){
                            console.log(error);
                            res.status(500).send(error);                           
                            throw error;
                        } else {
                            console.log(data);
                            res.status(200).send('User saved succesfully.');                   
                        }
                    });    
                }               
            });   
        }    
    });
});

// Check if the session data is available for cart checkout
router.get('/sessionDataAvailability', function (req, res) {
    if (globals.sessionData == ''){
        res.status(409).send('Cart data not available');
    }
    res.status(200).send('Cart data available');    
});

// Check if the session data is available for cart checkout
router.get('/', function (req, res) {
    if (globals.sessionData == ''){
        res.status(404).send('Session data not found');
    }
    res.status(200).send((globals.sessionData));    
});


console.log('User Router Active');
module.exports = router;