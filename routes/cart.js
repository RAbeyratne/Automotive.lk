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
            globals.shoppingCart[itemInCart].totalAmount = Math.round((remainingTotal + dataItem.totalAmount) * 100) / 100;
            res.status(200).send('Updated the content of the cart');            
            break;
        }      
    }

    if (!isInsideCart){
        // Making a new item entry, if it's not already in the cart
        globals.shoppingCart[dataItem['pid']] = dataItem;  
        globals.shoppingCart[dataItem['pid']].totalAmount = Math.round((globals.shoppingCart[dataItem['pid']].totalAmount) * 100) / 100;
        res.status(200).send('Added the new item to the cart');
    }
});

// Get cart item details
router.get('/', function (req, res) {
    res.status(200).send(globals.shoppingCart);
});

// Get the total Amount of Cart
router.get('/totalAmount', function (req, res) {
    var totalOfCart = 0;
    for(var itemInCart in globals.shoppingCart){
        totalOfCart = totalOfCart + globals.shoppingCart[itemInCart].totalAmount;
    }  
    res.status(200).send(Math.round((totalOfCart) * 100) / 100 + '');
});

// Removing a certain item from the cart
router.delete('/removeItem/:id', function (req, res) {
    var id = req.params.id;
    console.log('Deleting item => ' + id);
    delete globals.shoppingCart[id];
    res.status(200).send('Removed item from the cart');
});


// Check if the cart data is available for checkout
router.get('/cartDataAvailability', function (req, res) {
    if (globals.shoppingCart == ''){
        res.status(409).send('Session data not available');
    }
    res.status(200).send('Session data available');    
});

console.log('Cart Router Active');
module.exports = router;