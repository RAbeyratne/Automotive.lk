var express = require('express');
var router = express.Router();


router.use(function timeLog (req, res, next) {
  next();
});

// Sign in process
router.post('/userAuthentication', function (req, res) {
          console.log(req.body);
        res.send('User authentication data recieved');
});

// Sign up process
router.post('/userRegistration', function (req, res) {
        console.log(req.body);
        res.send('User details recieved');
});

console.log('User Router Active');
module.exports = router;