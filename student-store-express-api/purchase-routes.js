const express = require("express");
const router = express.Router();
const { BadRequestError } = require("./utils/errors")
const StoreModel = require("./store");

// get all purchases
router.get("/", async (req, res, next) => {
    try {
        res.send({"purchases": await StoreModel.getAllPurchases()});
    } catch (err) {
        next(err);
    }
});

// get single purchase
router.get("/:purchaseId", async (req, res, next) => {
    try {
        const idStr = req.params.purchaseId;
        if (isNaN(idStr)) {
            throw new BadRequestError("Purchase ID is not a number");
        }
        res.send({"purchase": await StoreModel.getPurchase(parseInt(idStr))});
    } catch (err) {
        next(err);
    }
});

module.exports = router;