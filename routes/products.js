var express = require('express');
var products = require('../public/Data/products.json')
var router = express.Router();

router.get('/',function(req,res){
    res.json(products)
})
router.get('/:id',function(req,res){
   let id= req.params.id;
    res.json(products[id]);
} )

router.get('/:id/:qt', function(req, res) {
    let id = req.params.id;
    let quantity = req.params.qt;
    
    if (id >= products.length || !products[id]) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    if (quantity < 0 || isNaN(quantity)) {
        res.status(400).json({ error: "Invalid quantity" });
        return;
    }

    let unit_price = products[id].price;
    if (unit_price === undefined) {
        res.status(500).json({ error: "Price not available for the product" });
        return;
    }

    let total_price = unit_price * quantity;

    res.json({
        id: id,
        qt: quantity,
        unit_price: unit_price,
        total_price: total_price
    });
});

router.get('/instock/:qt', function(req, res) {
    let qt = parseInt(req.params.qt); // Convert qt to an integer
    
    if (isNaN(qt) || qt < 0) {
        res.status(400).json({ error: "Invalid quantity" });
        return;
    }

    let instock = [];

    for (let key in products) {
        if (products.hasOwnProperty(key)) {
            if (products[key].stock > qt) { // Check if stock exceeds qt
                instock.push(products[key]);
            }
        }
    }
    
    res.json(instock);
});



/* GET users listing. */

/*
router.get('/', function(req, res) {
  res.json({
    hostname : os.hostname(),
    type : os.type(),
    platform : os.platform()
  });
});
*/

module.exports = router;
