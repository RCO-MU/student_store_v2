/* eslint-disable no-console */
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import validator from 'validator';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import ProductDetail from '../ProductDetail/ProductDetail';
import NotFound from '../NotFound/NotFound';
import { API_URL } from '../../constants';
import './App.css';

export default function App() {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************

  const navigate = useNavigate();

  // **********************************************************************
  // STATE VARIABLES AND FUNCTIONS
  // **********************************************************************

  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState({});

  // **********************************************************************
  // AXIOS GET AND POST FUNCTIONS
  // **********************************************************************

  async function fetchAllProductData() {
    setIsFetching(true);
    try {
      const { data } = await axios(API_URL);
      console.log('productData ', data);
      setProducts(data.products);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function sendPostRequest(body) {
    setIsFetching(true);
    try {
      const resp = await axios.post(API_URL, body);
      console.log(resp.data);
      setPurchaseInfo(resp.data.purchase);
      setError('');
      setShoppingCart([]);
      setCheckoutForm({ name: '', email: '' });
      setPurchaseCompleted(true);
      setQuery('');
      setCategory('all');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err);
      setPurchaseCompleted(true);
      navigate('/');
    } finally {
      setIsFetching(false);
    }
  }

  // **********************************************************************
  // HANDLER FUNCTIONS (8)
  // **********************************************************************

  // toggles sidebar
  const handleOnToggle = () => {
    if (purchaseCompleted && !isOpen) {
      setPurchaseCompleted(false);
    }
    setIsOpen(!isOpen);
  };

  const handleAddItemToCart = (productId) => {
    const productIndex = shoppingCart.findIndex((product) => product.itemId === productId);
    // if productId doesn't exist in shoppingCart, add it as a new product
    if (productIndex === -1) {
      setShoppingCart([...shoppingCart, {
        itemId: productId,
        quantity: 1,
      }]);
    // if productId is in shoppingCart, increment its quantity by 1
    } else {
      shoppingCart[productIndex].quantity += 1;
      setShoppingCart([...shoppingCart]);
    }
  };

  const handleRemoveItemFromCart = (productId) => {
    const productIndex = shoppingCart.findIndex((product) => product.itemId === productId);
    // if product is in cart
    if (productIndex !== -1) {
      const { quantity } = shoppingCart[productIndex];
      // if only 1 left of product, remove from shoppingCart entirely
      if (quantity === 1) {
        shoppingCart.splice(productIndex, 1);
        setShoppingCart([...shoppingCart]);
      } else {
        shoppingCart[productIndex].quantity -= 1;
        setShoppingCart([...shoppingCart]);
      }
    }
  };

  const handleOnCheckoutFormChange = (name, value) => {
    const newCheckoutForm = { ...checkoutForm };
    newCheckoutForm[name] = value;
    setError('');
    setCheckoutForm(newCheckoutForm);
  };

  const handleOnSubmitCheckoutForm = async () => {
    if (shoppingCart.length === 0) {
      setError('empty cart');
      return 400;
    }
    if (checkoutForm.email === '') {
      setError('empty email');
      return 400;
    }
    if (checkoutForm.name === '') {
      setError('empty name');
      return 400;
    }
    if (!validator.isEmail(checkoutForm.email)) {
      setError('invalid email');
      return 400;
    }

    const checkoutRequestBody = {
      user: checkoutForm,
      shoppingCart,
    };
    await sendPostRequest(checkoutRequestBody);
    return 200;
  };

  const handleQueryChange = (queryString) => {
    setQuery(queryString);
  };

  const handleCategoryChange = (categoryString) => {
    setCategory(categoryString);
  };

  const handleTryAgain = () => {
    setPurchaseCompleted(false);
    setError('');
  };

  // **********************************************************************
  // FETCH DATA ON PAGE LOAD
  // **********************************************************************

  useEffect(() => {
    fetchAllProductData();
  }, []);

  // **********************************************************************
  // PAGE RENDERING
  // **********************************************************************
  return (
    <div
      className="app"
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Escape') { handleOnToggle(); }
      }}
      tabIndex={0}
    >
      <main>
        <Sidebar
          isOpen={isOpen}
          products={products}
          shoppingCart={shoppingCart}
          checkoutForm={checkoutForm}
          error={error}
          isFetching={isFetching}
          purchaseCompleted={purchaseCompleted}
          purchaseInfo={purchaseInfo}
          handleOnToggle={handleOnToggle}
          handleOnCheckoutFormChange={handleOnCheckoutFormChange}
          handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemFromCart={handleRemoveItemFromCart}
          handleTryAgain={handleTryAgain}
        />
        <Navbar />
        <div
          className={!isOpen ? 'home-page-display' : 'home-page-display deactivated'}
          onClick={handleOnToggle}
          onKeyDown={() => {}}
          label="home-page-display"
          role="button"
          tabIndex={0}
        />
        <Routes>
          <Route
            path="/"
            element={(
              <Home
                products={products}
                query={query}
                category={category}
                shoppingCart={shoppingCart}
                isFetching={isFetching}
                handleAddItemToCart={handleAddItemToCart}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                handleQueryChange={handleQueryChange}
                handleCategoryChange={handleCategoryChange}
              >
                {window.scrollTo(0, 0)}
              </Home>
)}
          />
          <Route
            path="/products/:productId"
            element={(
              <ProductDetail
                shoppingCart={shoppingCart}
                handleAddItemToCart={handleAddItemToCart}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                error={error}
                setError={setError}
              >
                {window.scrollTo(0, 0)}
              </ProductDetail>
)}
          />
          <Route path="*" element={<NotFound>{window.scrollTo(0, 0)}</NotFound>} />
        </Routes>
        <footer>
          <div className="footer-content">
            <div id="about-us">
              <h1 className="about-us-title">About Us</h1>
              <div className="about-us-content">
                <p>
                  {`The Student Store™ offers "great products" (they're okay) at "great prices" 
                  (sorry for the inflation) from a "great team" (one developer) 
                  and for a "great cause" (my bank account).`}

                </p>
                <p>
                  {`We've searched "far and wide" (fetched from a premade API) for items 
                  that perk the interests of even the most eccentric students and decided to 
                  "offer them" (you can't actually buy these items) all here in one "place" 
                  (not actually real).`}

                </p>
                <p>
                  {`All "proceeds" (again, you can't actually pay) go towards bringing "high quality CS
                  education" (paying my college tuition) to "college students" (just me) "around the country" (one place).`}

                </p>
              </div>
            </div>
            <div id="contact-us">
              <h1 className="contact-us-title">Contact Us</h1>
              <div className="contact-us-content">
                <p>
                  <b>• Email: </b>
                  rco@fb.com
                </p>
                <p>
                  <b>• Phone: </b>
                  305-NOT-REAL
                </p>
                <p>
                  <b>• Address: </b>
                  Somewhere in Miami
                </p>
                <p>
                  <b>• Socials: </b>
                  @el.papi.rafi on Instagram 🤪
                </p>
              </div>
            </div>
          </div>
          <div id="final">
            <div className="final-text-div">
              <h1 className="final-text">
                We hope you enjoy The Student Store™!
              </h1>
            </div>
            <div className="logo-img-div">
              <img
                className="logo-img-footer"
                src="https://i.imgur.com/Ewq65P0.png"
                alt="logo"
              />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
