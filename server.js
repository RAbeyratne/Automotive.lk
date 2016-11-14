// Automotive.lk Application

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Processes
    // Product page
    app.get('/fullProductList', function (req, res) {
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

app.listen(3000);
console.log("Automotive.lk running on port 3000");