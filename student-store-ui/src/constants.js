// API URL
export const API_URL = 'http://localhost:3001';

// store endpoint
export const STORE_EXT = '/store';

// purchase endpoint
export const PURCHASE_EXT = '/purchases';

// if search returns no items
export const noItemsMessage = "Sorry, we couldn't find what you were looking for.";

// sample item 1 (testing)
export const sampleItem = {
  itemId: 1,
  quantity: 2,
};

// sample item 2 (testing)
export const sampleItem2 = {
  itemId: 2,
  quantity: 3,
};

// sample post request body (testing)
export const sampleBody = {
  user: {
    name: 'Rafael',
    email: 'rco@fb.com',
  },
  shoppingCart: [
    sampleItem,
    sampleItem2,
  ],
};
