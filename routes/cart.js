var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var globals = require('../globals'); 

router.use(session({secret:'ydfuisyfviusydgvi1ugnlk', resave:false, saveUninitialized:true}));

// Add item to cart
router.post('/additem', function (req, res) {    
    
//    console.info(req.body.item.qty);
    var dataItem = req.body.item;
    dataItem['qty'] = Number(req.body.qty);
    dataItem['totalAmount'] = req.body.item.price * req.body.qty;
    console.log('Recieved data item >>> ' + JSON.stringify(dataItem));

    var isInsideCart = false;
    
    for(var itemInCart in globals.shoppingCart){
        if (itemInCart == req.body.item.pid){
            isInsideCart = true;
            globals.shoppingCart[itemInCart].qty = globals.shoppingCart[itemInCart].qty + dataItem.qty;
            console.log('remaining number qty ' + globals.shoppingCart[itemInCart].qty);
            console.log('new number qty ' + dataItem.qty);
            
            var total = globals.shoppingCart[itemInCart].qty + dataItem.qty;
            console.log('total number qty ' + total);
            
//            res.status(200).send(globals.shoppingCart[itemInCart].qty);
        }      
    }
    globals.shoppingCart[req.body.item.pid] = req.body.item;
    
    if (!isInsideCart){
        globals.shoppingCart[ dataItem['pid']] = dataItem;
        res.status(200).send(globals.shoppingCart);
    }
});

// Get cart details
router.get('/status', function (req, res) {
    res.status(200).send(JSON.stringify(globals.shoppingCart));
});



console.log('Cart Router Active');
module.exports = router;