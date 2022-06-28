const productsJSON = require('./data/db.json');
const products = productsJSON.products;

const TAX_RATE = 0.0875;

class Store {
    constructor() {
        this.super();
    }

    static getAllProducts() {
        return products;
    }

    static getProduct(productId) {
        return products.find(item => item.id === productId);
    }

    // currency formatter
    static #formatPrice(price) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return (formatter.format(price));
    }

    static createPurchase(checkoutForm) {
        const id = 1; // NOT IMPLEMENTED CORRECTLY YET
        const name = checkoutForm.user.name;
        const email = checkoutForm.user.email;
        const order = checkoutForm.shoppingCart;
        const createdAt = new Date().toLocaleString();
        const receipt = "Not implemented yet"; // NOT IMPLEMENTED CORRECTLY YET

        let subtotal = 0.0;
        let itemCount = 0;
        order.forEach((item) => {
            const product = products.find((product) => product.id === item.itemId);
            const itemPrice = parseFloat(product.price);
            const itemQuantity = parseInt(item.quantity);
            subtotal += itemPrice * itemQuantity;
            itemCount += itemQuantity;
        });
        const tax = subtotal * TAX_RATE;
        const total = tax + subtotal;
        return {id, 
                name, 
                email, 
                order, 
                subtotal: Store.#formatPrice(subtotal), 
                tax: Store.#formatPrice(tax),
                total: Store.#formatPrice(total), 
                itemCount, 
                createdAt, 
                receipt}
    };
  }

module.exports = Store;