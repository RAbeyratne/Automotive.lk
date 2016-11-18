var express = require('express');
var router = express.Router();


router.use(function timeLog (req, res, next) {  
  next();
});

// define the home page route
router.get('/', function (req, res) {
  console.log('GET request recieved for product catalog ~~~');
        var part1 = {
            title:"Title1",
            category:"Category1",
            description:"Demo description 01. Demo description 01. Demo description 01. Demo description 01. Demo description 01. Demo description 01. Demo description 01. Demo description 01.",
            price:19.99
        };
        var part2 = {
            title:"Title2",
            category:"Category2",
            description:"Demo description 02. Demo description 02. Demo description 02. Demo description 02. Demo description 02. Demo description 02. Demo description 02. Demo description 02.",
            price:29.99
        };
        var part3 = {
            title:"Title3",
            category:"Category3",
            description:"Demo description 03. Demo description 03. Demo description 03. Demo description 03. Demo description 03. Demo description 03. Demo description 03. Demo description 03.",
            price:39.99
        };
        var samplePartList = [part1, part2, part3];
        res.send(samplePartList);
});
//// define the about route
//router.get('/about', function (req, res) {
//  res.send('About birds');
//});

console.log('Product Router Active');

module.exports = router;