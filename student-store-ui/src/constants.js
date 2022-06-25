// API URL
export const API_URL = 'https://codepath-store-api.herokuapp.com/store';

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
