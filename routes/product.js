var express = require('express');
var router = express.Router();
var productModel = require('../productSchema');
var globals = require('../globals'); 

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

router.get('/item/:pid', function (req, res) {
  console.log('GET request recieved for item details ~~~');
    var pid = req.params.pid;
    console.log(pid);
        productModel.find({pid:pid} , function(error, data) {
        if (error){
            throw err;
            res.status(500).send(error);  
        }
            console.log(data);
            res.status(200).send(data[0]);  
        });              
});

console.log('Product Router Active');
module.exports = router;