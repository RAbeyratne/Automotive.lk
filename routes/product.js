var express = require('express');
var router = express.Router();
var productModel = require('../schema');

router.use(function timeLog (req, res, next) {  
  next();
});

// define the home page route
router.get('/', function (req, res) {
  console.log('GET request recieved for product catalog ~~~');
        productModel.find('' , function(err, data) {
        if (err){
            throw err;
        }
            console.log(data);
            res.send(data);  
        });              
});

console.log('Product Router Active');
module.exports = router;