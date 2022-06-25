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
          className={!isOpen ? 'screen-content' : 'screen-content deactivated'}
          onClick={handleOnToggle}
          onKeyDown={() => {}}
          label="screen-content"
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
              />
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
              />
)}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer>
          <p>This is where the footer info goes</p>
        </footer>
      </main>
    </div>
  );
}
