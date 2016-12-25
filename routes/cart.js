var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');
var globals = require('../globals'); 

router.use(session({secret:'ydfuisyfviusydgvi1ugnlk', resave:false, saveUninitialized:true}));

// Add item to cart
router.post('/additem', function (req, res) {  
    var dataItem = req.body.item;
    dataItem['qty'] = Number(req.body.qty);
    dataItem['totalAmount'] = req.body.item.price * req.body.qty;
    console.log('Recieved data item >>> ' + JSON.stringify(dataItem));

    var isInsideCart = false;
    
    // Checking whether the item is inside the array
    for(var itemInCart in globals.shoppingCart){
        if (itemInCart == req.body.item.pid){   
            isInsideCart = true;
            
            // If so, updating the quantity and total amount of the item
            var remainingQty = globals.shoppingCart[itemInCart].qty;    
            var remainingTotal = globals.shoppingCart[itemInCart].totalAmount;   
            globals.shoppingCart[itemInCart].qty = remainingQty + dataItem.qty;  
            globals.shoppingCart[itemInCart].totalAmount = remainingTotal + dataItem.totalAmount;
            res.status(200).send('Updated the content of the cart');            
            break;
        }      
    }

    if (!isInsideCart){
        // Making a new item entry, if it's not already in the cart
        globals.shoppingCart[ dataItem['pid']] = dataItem;        
        res.status(200).send('Added the new item to the cart');
    }
});

// Get cart details
router.get('/status', function (req, res) {
    res.status(200).send(globals.shoppingCart);
});


console.log('Cart Router Active');
module.exports = router;