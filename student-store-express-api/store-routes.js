const express = require("express");
const router = express.Router();
const { BadRequestError, NotFoundError } = require("./utils/errors")
const StoreModel = require("./store");

// get all products
router.get("/", async (req, res, next) => {
    try {
        res.send({"products": await StoreModel.getAllProducts()});
    } catch (err) {
        next(err);
    }
});

// get single product
router.get("/:productId", async (req, res, next) => {
    try {
        const idStr = req.params.productId;
        if (isNaN(idStr)) {
            throw new BadRequestError("Product ID is not a number");
        }
        res.send({"product": await StoreModel.getProduct(parseInt(idStr))});
    } catch (err) {
        next(err);
    }
});

// create new purchase
router.post("/", async (req, res, next) => {
    try {
        const checkoutJSON = req.body;
        const cart = checkoutJSON.shoppingCart; // [{itemId, quantity}, ...]
        // shoppingCart must be defined
        if (cart === undefined) {
            throw new BadRequestError("Missing shopping cart");
        }

        cart.forEach((item) => {
            // all items must have itemId and quantity
            if (item.itemId === undefined) {
                throw new BadRequestError("Item in shopping cart missing ID"); 
            }
            if (item.quantity === undefined) {
                throw new BadRequestError("Item in shopping cart missing quantity");
            }
            // no items must share the same itemId
            let itemsOfOneId = cart.filter((item2) => item.itemId === item2.itemId);
            if (itemsOfOneId.length != 1) {
                throw new BadRequestError('Duplicate items in cart');
            }
        })

        const user = checkoutJSON.user;
        if (user === undefined) {
            throw new BadRequestError('Missing user info');
        }

        const purchase = await StoreModel.createPurchase(checkoutJSON);
        res.status(201).send({purchase: purchase});
    } catch (err) {
        next(err);
    }
});

module.exports = router;