var express = require('express');
var router = express.Router();
var productModel = require('../productSchema');

router.use(function timeLog (req, res, next) {  
  next();
});

// define the home page route
router.get('/', function (req, res) {
  console.log('GET request recieved for product catalog ~~~');
        productModel.find('' , function(error, data) {
        if (error){
            throw err;
            res.status(500).send(error);  
        }
            console.log(data);
            res.status(200).send(data);  
        });              
});

console.log('Product Router Active');
module.exports = router;