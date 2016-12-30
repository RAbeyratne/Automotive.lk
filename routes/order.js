var express = require('express');
var router = express.Router();
var orderModel = require('../orderSchema');
var globals = require('../globals'); 

router.use(function timeLog (req, res, next) {  
  next();
});

// define the home page route
router.post('/', function (req, res) {
  console.log('END POINT ~ HIT ' + JSON.stringify(req.body));
//        productModel.find('' , function(error, data) {
//        if (error){
//            throw err;
//            res.status(500).send(error);  
//        }
//            console.log(data);
//            res.status(200).send(data);  
//        });              
});


console.log('Order Router Active');
module.exports = router;