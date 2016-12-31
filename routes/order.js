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

     var newOrder = orderModel({
                email : req.body.email,
                name : req.body.name,
                date : req.body.date,
                total : req.body.total     
            });

    console.log(newOrder);
    
    newOrder.save(function(error){
        if(error){
            res.status(500).send(error);    
            throw error;
        } else {
            orderModel.find({}, function(error, data){
                if (error){
                    console.log(error);
                    res.status(500).send(error);
                    throw error;
                } else {
                    console.log(data);
                    res.status(200).send('Order saved succesfully.');
                    globals.shoppingCart = '';
                }
            });   
        }
    });     
});


console.log('Order Router Active');
module.exports = router;