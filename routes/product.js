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

//Checking if a product id exists 
router.get('/item/:pid', function (req, res) {
  console.log('GET request recieved for item details ~~~');
    var pid = req.params.pid;
    console.log(pid);
        productModel.find({pid:pid} , function(error, data) {
        if (error){
            throw error;
            res.status(500).send(error);  
        }
            console.log(data);
            if (data[0] == undefined){
                res.status(200).send(data[0]);
            } else {
                res.status(204).send('Product ID already exists.');
            }
        });              
});

// Adding a product to the catalogue
router.post('/addProduct', function (req, res) {    
    console.log(req.body);
    var newProduct = productModel(req.body);

    newProduct.save(function(error){
        if(error){
            res.status(500).send(error);
            throw error;
        } else {
            productModel.find({}, function(error, data){
                if (error){
                    console.log(error);
                    res.status(500).send(error);
                    throw error;
                } else {
                    console.log(data);
                    res.status(200).send('Product saved succesfully.');
                }
            });
        }               
    }); 
});

// Deleting a product from the catalogue
router.delete('/deleteItem/:id', function (req, res) {
    var id = req.params.id;

    productModel.remove({pid: Number(id)}, function (err, doc) {
        if (err){
            console.error(err);
            res.status(409).send(err);   
        }
      res.status(200).send('Product removed from catralogue succesfully.');
    });
})

console.log('Product Router Active');
module.exports = router;