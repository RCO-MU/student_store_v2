# Student Store React UI

## Overview

Selling merchandise in the modern era requires digital solutions. For this project, you'll be tasked with designing and constructing an online student store for the College of Codepath. The application entails a frontend user interface for potential customers to peruse the goods, and a backend API to handle data management. The API will be built with Node and Express and the UI will be built with React.

### Application Features

### Core Features
  - [X] Displays the following sections: header, banner, search, product grid, about, contact, and footer.
  - [X] On initial page load, display the products at the GET /store endpoint.
  - [X] User can click on the categories (Clothing, food, etc) to filter the product grid by type.
  - [X] User can search for products.
  - [X] User can click on a product in the grid to view additional product details. Navigation is via a React Router.

### Stretch Features
  - [X] User can click to expand the shopping cart in the left navigation.
  - [X] User can click the '+' button on a product cart to increment that product in the shopping cart.
  - [X] User can click the '-' button on a product cart to increment that product in the shopping cart.
  - [X] Shopping cart displays a table of products, quantities, subtotal, tax, and total.
  - [X] Buttons in the Navbar to scroll to the relevant section.

### Extra Features  

  - [X] Clicking the logo, homepage product cards, and checkout form (on success) automatically reset the window scroll to the top of the page.
  - [X] Sidebar dims and deactivates the main screen content.
  - [X] Sidebar can be opened with `Esc` and closed with `Esc` or clicking on the dimmed screen content.
  - [X] Email input only accepts a valid email address.
  - [X] Upon purchase failure, user has a "Try Again" button to reattempt the purchase (shopping cart contents are kept).
  - [X] Purchase receipt allows user contains "Keep Shopping" button.
  - [X] `NotFound` page has a `Link` component to return to the homepage.

### React UI

**App.jsx**

  - [X] The core App component that contains the routes for the app and does the initial data fetching
  - [X] Renders a `BrowserRouter` component that contains a `Routes` component with the following routes:
        *(The redirection works, but I did not use a `BrowserRouter` because it was causing errors in conjuction with `Routes`.)*
    - [X] `/` - Should render the `Home.jsx` component
    - [X] `/products/:productId` - should render the `ProductDetail` component
    - [X] `*` - anything else should render the `NotFound` component
  - [X] Renders the `Navbar` component on every route
  - [X] Renders the `Sidebar` component on every route
  - [X] Should create **at least** the following state variables:
    - [X] `products` - an array of product objects that is initially empty.
    - [X] `isFetching` - a boolean value representing whether or not the App is currently fetching the `products` from the API.
    - [X] `error` - a variable used to display a message when something goes wrong with the API requests.
    - [X] `isOpen` - a boolean value representing whether or not the `Sidebar.jsx` is in the open or closed state.
    - [X] `shoppingCart` - should store state for the active user's shopping cart (items they want to purchase and the quantity of each item).
      - [X] Use whatever data type works best here, but make sure the format the `shoppingCart` as an array before passing it to other components.
      - [X] When passed down to other components as a prop, it should formatted as an array of objects.
      - [X] Each object in the array should have two fields:
        - [X] The `itemId` field should store the `id` of the item being purchased.
        - [X] The `quantity` field should store a number representing how many of that item the user is purchasing.
    - [X] `checkoutForm` - the user's information that will be sent to the API when they checkout.
  - [X] Leverage the `useEffect` hook to ensure that when the `App.jsx` component is mounted to the screen...
    - [X] It should make a `GET` request to the API's `/store` endpoint with the `axios.get` method.
    - [X] When the request completes successfully, it should store the `products` returned by the response in state.
    - [X] If the request does not complete successfully, or there are no `products` found in the response,
            it should create an error message and store it in the `error` state variable.
  - [X] The `App.jsx` component should define handler functions to be passed as props to the `Home` and `ProductDetail` components.
    - [X] Define as many as are needed.
    - [X] At minimum, **create these five handlers**:
      - [X] The **`handleOnToggle`** function. When called...
        - [X] It should toggle the open/closed state of the `Sidebar`.
      - [X] The **`handleAddItemToCart`** function. When called...
        - [X] It should accept a single argument - `productId`
        - [X] It should add that product to the `shoppingCart` if it doesn't exist, and set its quantity to `1`.
        - [X] If it does exist, it should increase the quantity by `1`.
        - [X] It should add the price of the product to the total price of the `shoppingCart`.
      - [X] The **`handleRemoveItemFromCart`** function. When called...
        - [X] It should accept a single argument - `productId`
        - [X] It should decrease the quantity of the item in the `shoppingCart` by `1`, but only if it already exists.
        - [X] If it doesn't exist, the function should do nothing.
        - [X] If the new quantity is `0`, it should remove the item from the `shoppingCart`
      - [X] The **`handleOnCheckoutFormChange`** function. When called...
        - [X] It should receive two arguments:
          - [X] `name` - the `name` attribute of the input being updated
          - [X] `value` - the new value to set for that input
        - [X] It should update the `checkoutForm` object with the new value from the correct input(s)
      - [X] The **`handleOnSubmitCheckoutForm`** function. When called...
        - [X] It should submit the user's order to the API
        - [X] To submit the user's order, it should leverage the `axios.post` method to send a `POST` request to the `/store` endpoint.
        - [X] The body of that `POST` request should be an object with two fields:
          - [X] The `user` field:
            - [X] Should be an object containing `name` and `email` properties
            - [X] Each property should be set to the correct value found in the `checkoutForm`
          - [X] The `shoppingCart` field:
            - [X] Should contain the user's order formatted as an array of objects.
            - [X] Each object in the array should have two fields:
              - [X] The `itemId` field should store the `id` of the item being purchased.
              - [X] The `quantity` field should store a number representing how many of that item the user is purchasing.
            - [X] Don't include the `total` price here, since we'll be calculating that on the backend. Remember to never trust the client!

**Navbar.jsx**

  - [X] Should render JSX that is wrapped by a `nav` element with a `className` of `navbar`
  - [X] Should render the `Logo` component that links to the `/` route when clicked

**Logo.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `logo`
  - [X] Should use the `Link` component from `react-router-dom` to link to the home route (`/`) when clicked

**Home.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `home`
  - [X] Should accept **at least** the following props:
    - `products` - an array of product objects
    - `handleAddItemToCart` - handler function defined in the `App.jsx` component
    - `handleRemoveItemToCart` - handler function defined in the `App.jsx` component
  - [X] Should render the `Hero` component
  - [X] Should render the `ProductGrid` component

**Hero.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `hero`
  - [X] Should display an intro message inside an element with the `className` of `intro`. That message should contain the text `"Welcome!"` somewhere within it.
  - [X] Should render a hero image inside an `img` tag with the `className` of `hero-img`.

**ProductGrid.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `product-grid`
  - [X] Should accept **at least** the following props:
    - `products` - an array of product objects
    - `handleAddItemToCart` - handler function defined in the `App.jsx` component
    - `handleRemoveItemToCart` - handler function defined in the `App.jsx` component
  - [X] Should iterate over its `products` prop, rendering a `ProductCard` component for each one. Set the `showDescription` prop to `false` for all of the `ProductCard` components rendered in the `ProductGrid` component.

**ProductDetail.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `product-detail`
  - [X] Should accept **at least** the following props:
    - `handleAddItemToCart` - handler function defined in the `App.jsx` component
    - `handleRemoveItemToCart` - handler function defined in the `App.jsx` component
  - [X] Should define **at least** a `product` state variable and updater
  - [X] It should leverage the `useParams` hook from `react-router-dom` to extract the `productId` param from the url.
  - [X] When the component is mounted to the screen...
    - [X] It should make a `GET` request to the `/store/:productId` endpoint with the `axios.get` method.
    - [X] The `:productId` part of the request should be replaced with the `productId` pulled from the url.
    - [X] When the initial request is loading, it should render an `h1` element with the `className` of `loading` and contain the text `"Loading..."`
    - [X] It should store the `product` received by the request in state and then render the `ProductView` component.
    - [X] If no `product` is found with that `id`, it should render the `NotFound` component

**ProductView.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `product-view`
  - [X] Should accept **at least** the following props:
    - `product` - the `product` object returned by the API request
    - `productId` - the id of the product extracted from the url
    - `quantity` - the quantity for this product found in the `shoppingCart`
    - `handleAddItemToCart` - handler function
    - `handleRemoveItemToCart` - handler function
  - [X] It should display an `h1` element with the `className` of `product-id` that contains the text: `Product #` followed by the `productId` prop
  - [X] It should render a `ProductCard` component and pass it the props it needs. It should also set the `showDescription` prop to `true` for this product card.

**ProductCard.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with a `className` of `product-card`
  - [X] Should accept **at least** the following props:
    - `product` - a product object
    - `productId` - a `number` representing the `id` of the product
    - `quantity` - the quantity for this product found in the `shoppingCart`
    - `handleAddItemToCart` - handler function
    - `handleRemoveItemToCart` - handler function
    - `showDescription` - boolean
  - [X] Should render the `name` of the product inside an element with the `className` of `product-name`
  - [X] Should render the `price` of the product inside an element with the `className` of `product-price`. The price should formatted so that it starts with a `$`, and has **at least one** integer digit, along with **exactly two** decimal digits. Examples - `$22.99`, `$860.20`, and `$0.50`
  - [X] If the `showDescription` prop is set to `true`, it should render the `description` of the product inside an element with the `className` of `product-description`.
  - [X] Should render an `img` element for the product:
    - [X] The `img` element should have a `src` attribute to set to the `image` property of the `product` prop.
    - [X] The `img` element should be wrapped in a `Link` component from `react-router-dom`.
      - [X] The `Link` element should have a `to` prop so that when the `img` element is clicked on, it should navigate to the product detail route for that product using its `id` attribute. For example, a product with an `id` of `4` should create a `Link` with its `to` prop set to `/products/4`.
      - [X] The `Link` that wraps the `img` element should be nested somewhere inside an element with the `className` of `media`.
  - [X] Should render two `buttons` elements...
    - [X] One button with a `className` of `add`. When clicked, it should call the `handleAddItemToCart` function with the `id` of the `product` as its only argument.
    - [X] One button with a `className` of `remove`. When clicked, it should call the `handleRemoveItemFromCart` function with the `id` of the `product` as its only argument.
  - [X] Should display the current quantity of items that the user has selected in their shopping cart. The quantity should be rendered inside an element with the `className` of `product-quantity`. If none of that particular item have been added to the shopping cart, it should render nothing there.

**Sidebar.jsx**

  - [X] Should render JSX that is wrapped by a `section` element with the `className` of `sidebar`
  - [X] Should accept **at least** the following props (and probably a few more):
    - `isOpen` - boolean representing the open/closed state of the Sidebar
    - `shoppingCart` - the active user's cart formatted as an array of objects with `itemId` and `quantity` keys
    - `products` - the array of products fetched from the API
    - `checkoutForm` - the form state for the `CheckoutForm` component
    - `handleOnCheckoutFormChange` - handler function to update the `checkoutForm` object
    - `handleOnSubmitCheckoutForm` - handler function to submit the user's order to the API
    - `handleOnToggle` - handler function to toggle open/closed `Sidebar` state
  - [X] It should always render a `button` element with the `className` of `toggle-button`. When that button is clicked it should change the `isOpen` prop by calling the `handleOnToggle` prop.
  - [X] When the sidebar is opened, it should display the `ShoppingCart` and `CheckoutForm` components and should be wider than `350px`.
  - [X] When the sidebar is closed, it should only render the toggle button and shouldn't be wider than `150px`.

**ShoppingCart.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with the `className` of `shopping-cart`
  - [X] Should accept **at least** the following props (and probably a few more):
    - `isOpen` - boolean representing the open/closed state of the Sidebar
    - `products` - the array of products fetched from the API
    - `shoppingCart` - the active user's cart formatted as an array of objects with `itemId` and `quantity` keys
  - [X] For every item in the `shoppingCart`:
    - [X] It should display the `name` of the item in an element with the `className` of `cart-product-name`. Remember that items in the `shoppingCart` prop will **only** contain the `itemId` and `quantity` fields. Other props will have to be used to conver the `itemId` field to the `product`'s name.
    - [X] It should display the `quantity` of the item in an element with the `className` of `cart-product-quantity`
  - [X] It add up the cost of all items (make sure to use the quantity of the item requested), and render that amount **rounded up to exactly 2 decimal places** inside an element with the `className` of `subtotal`. Make sure it is prefixed with a dollar sign ($)!
  - [X] It should calculate the cost of taxes on that subtotal (using 8.75% as the tax rate), add that amount to the subtotal, and render the total cost **rounded up to exactly 2 decimal places** inside an element with the `className` of `total-price`. Make sure it is prefixed with a dollar sign ($)!
  - [X] If no items exist in the `shoppingCart`, it should render this message: `"No items added to cart yet. Start shopping now!"` inside an element with the `className` of `notification`

**CheckoutForm.jsx**

  - [X] Should render JSX that is wrapped by a `div` element with the `className` of `checkout-form`
  - [X] Should accept **at least** the following props:
    - `isOpen` - boolean
    - `shoppingCart` - the active user's cart formatted as an array of objects with `itemId` and `quantity` keys
    - `checkoutForm` - the form state for the `CheckoutForm` component
    - `handleOnCheckoutFormChange` - handler function to update the `checkoutForm`
    - `handleOnSubmitCheckoutForm` - handler function to submit the user's order to the API
  - [X] Should render two `input` elements, each with the `className` of `checkout-form-input`
    - [X] The `checkoutForm` prop should supply the correct props needed to create the two controlled inputs:
      - [X] The first input should have:
        - [X] the `type` prop set to `email`
        - [X] the `name` prop set to `email`
        - [X] the `placeholder` prop set to `student@codepath.org`
        - [X] the `value` prop set by `checkoutForm.email`.
        - [X] a valid `onChange` prop that uses the `handleOnCheckoutFormChange` function to update the `checkoutForm` state
      - [X] The second input should have:
        - [X] the `type` prop set to `text`
        - [X] the `name` prop set to `name`
        - [X] the `placeholder` prop set to `Student Name`
        - [X] the `value` prop set by `checkoutForm.name`.
        - [X] a valid `onChange` prop that uses the `handleOnCheckoutFormChange` function to update the `checkoutForm` state
  - [X] Should render a `button` element with the `className` of `checkout-button`.
    - [X] It should contain the text `Checkout`.
    - [X] When clicked, it should call the `handleOnSubmit` function.
      - [X] If that request fails, the `CheckoutForm` component should display an error message inside an element with the `className` of `error`.
      - [X] If the `POST` request is successful...
        - [X] The `CheckoutForm` component should display a success message that contains the text `"Success!"` inside an element with the `className` of `success`.
        - [X] The `shoppingCart` should be emptied
        - [X] The `checkoutForm` should be reset to its default state.

---

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

The labs were incredibly useful to learn the basics of React and were a great resource for this project. However, there were a lot of unexplained 
things with the components in `react-router-dom` that I felt should have been shown before this assignment. Even though I picked up 
`axios` very quickly, it seemed many people around me had trouble with it. I also think that way more CSS properties should be shown and taught.

On a different note, I also had an issue with the inconsistency of project core/stretch requirements across the Unit 2 Assignment page, the 
example deployed student store, and the readme. I was mostly following the section "Components and their expected functionality" from the 
webpage, only to realize the above "Goals" section highlighted much different core and stretch functionality, namely product filtering 
and shopping cart +/- buttons. Then, the template readme not only lists later requirements for the 3rd week of the project, but also points out 
the Navbar buttons to scroll to relevant sections, which are in the demo website, but never mentioned as a deliverable on the Unit 2 Assignment 
page. This is all to say I found the goals of the assignment were somewhat unclear.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
There were some features I was hoping to implement that were out of scope or would take too long (since I'm already submitting late.) 

- On the `Navbar`:
    - A "Cart" button that would display the total number of items in user's cart and toggle the sidebar
- On the `/products` page:
    - A more interesting background (color/pattern)
    - A "Back to Home" or "Continue Shopping" button to return to the homepage
    - A display of suggested products based on the previous page's search information
- On the homepage: 
    - User can hover over a product card to display either the item description, or a larger version of the product image

### Demo Video and Reflection


https://user-images.githubusercontent.com/73001297/176235786-facbb8e6-3d09-42cc-9b46-2b3fd2ea9970.mp4


* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you 
would like to try next time?

Overall, I think my demo is very seamless and I'm super proud of the finished UI and with how much I learned from the first project to now.

### Open-source libraries used

- N/A

### Shout out

Shoutout Arisa, Preeti, Robert, and Christina for being a dope moral support group.
