const { storage } = require("./data/storage");
const { BadRequestError } = require("./utils/errors")
const TAX_RATE = 0.0875;

class Store {
    constructor() {
        this.super();
    }

    // gets all products from database
    static async getAllProducts() {
        return storage.get('products').value();
    }

    // gets product with matching productId from database
    static async getProduct(productId) {
        const products = await this.getAllProducts();
        return products.find(item => item.id === productId);
    }

    // gets all past purchases from database
    static async getAllPurchases() {
        return storage.get('purchases').value();
    }

    // currency formatter
    static #formatPrice(price) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return (formatter.format(price));
    }

    // return a detailed purchase receipt and store purchase in database
    static async createPurchase(checkoutForm) {
        // fetching products and purchases
        const products = await this.getAllProducts();
        const purhases = await this.getAllPurchases();
        
        // purchase info consts
        const id = purhases.length + 1;
        const name = checkoutForm.user.name;
        const email = checkoutForm.user.email;
        const order = checkoutForm.shoppingCart;
        const createdAt = new Date().toLocaleString();
        const receipt = [];

        // iterate through shopping cart, calculate and store purchase info
        let subtotal = 0.0;
        let itemCount = 0;
        order.forEach((item) => {
            const product = products.find((product) => product.id === item.itemId);
            const itemPrice = parseFloat(product.price);
            const itemQuantity = parseInt(item.quantity);
            const itemsCost = itemPrice * itemQuantity;
            subtotal += itemsCost
            itemCount += itemQuantity;
            receipt.push(`${itemQuantity}x ${product.name} - ${Store.#formatPrice(itemPrice)} each, ${Store.#formatPrice(itemsCost)} total`);
        });

        // calculate tax and total
        const tax = subtotal * TAX_RATE;
        const total = tax + subtotal;

        // construct purchase object
        const purchase = {id, 
                name, 
                email, 
                order, 
                subtotal: Store.#formatPrice(subtotal), 
                tax: Store.#formatPrice(tax),
                total: Store.#formatPrice(total), 
                itemCount, 
                createdAt, 
                receipt}

        // store purchase in database and return purchase
        await storage.get("purchases").push(purchase).write();
        return purchase;
    };
  }

module.exports = Store;