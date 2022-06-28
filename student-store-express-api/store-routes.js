const express = require("express");
const router = express.Router();
const StoreModel = require("./store");

router.get("/", (req, res, next) => {
    res.send({"products": StoreModel.getAllProducts()});
});

router.get("/:productId", (req, res, next) => {
    const id = parseInt(req.params.productId);
    res.send({"product": StoreModel.getProduct(id)});
});

// When both are there, it should calculate the total cost of all the 
// items (including quantities), add a 8.75% tax to the total, and 
// create a new purchase object containing 6 required fields and 1 
// optional field:

router.post("/", (req, res, next) => {
    try {
    const checkoutJSON = req.body;
    const cart = checkoutJSON.shoppingCart; // [{itemId, quantity}, ...]
    // console.log(cart)
    // shoppingCart must be defined
    if (cart === undefined) {
        return res.status(400).send('Error, no cart info received');
    }
    cart.forEach((item) => {
        // all items must have itemId and quantity
        if (item.itemId === undefined || item.quantity === undefined) {
            return res.status(400).send('Error, item info incomplete');
        }
        // no items must share the same itemId
        let itemsOfOneId = cart.filter((item2) => item.itemId === item2.itemId);
        if (itemsOfOneId.length != 1) {
            return res.status(400).send('Error, duplicate items in cart');
        }
    })
    const user = checkoutJSON.user; // {name, email}
    // user must be defined
    if (user === undefined) {
        return res.status(400).send('Error, no user info received');
    }
    // console.log(user);
    const response = StoreModel.createPurchase(checkoutJSON);
    res.status(201).send({purchase: response});
    } catch(err) {
        console.log('Error'); 
        return res.status(400).send('Unknown error occurred');
    }
});

module.exports = router;