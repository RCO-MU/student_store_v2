import * as React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

export default function Sidebar({
  isOpen, products, shoppingCart, handleOnToggle, checkoutForm, error,
  purchaseCompleted, purchaseInfo, isFetching, handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm, handleAddItemToCart, handleRemoveItemFromCart,
  handleTryAgain,
}) {
  // collapsed sidebar
  if (!isOpen) {
    return (
      <section className="sidebar closed">
        <button className="expander button" onClick={handleOnToggle} type="button">
          <img
            className="expander image"
            src="https://i.imgur.com/dNtDksO.png"
            alt="sidebar expand"
          />
        </button>
      </section>
    );
  }
  // expanded sidebar
  return (
    <section className="sidebar open">
      <button className="collapser button" onClick={handleOnToggle} type="button">
        <img
          className="collapser image"
          src="https://i.imgur.com/dNtDksO.png"
          alt="sidebar collapse"
        />
      </button>
      <br />
      <br />
      <ShoppingCart
        isOpen={isOpen}
        products={products}
        shoppingCart={shoppingCart}
        purchaseCompleted={purchaseCompleted}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
      />
      <CheckoutForm
        isOpen={isOpen}
        shoppingCart={shoppingCart}
        checkoutForm={checkoutForm}
        error={error}
        isFetching={isFetching}
        purchaseCompleted={purchaseCompleted}
        purchaseInfo={purchaseInfo}
        handleOnToggle={handleOnToggle}
        handleOnCheckoutFormChange={handleOnCheckoutFormChange}
        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        handleTryAgain={handleTryAgain}
      />
      <hr />
      <button
        type="button"
        className="footer-button"
        onClick={handleOnToggle}
      >
        Keep Shopping
      </button>
      <Link
        to="/purchases#top"
      >
        <button
          type="button"
          className="footer-button purchase"
          onClick={handleOnToggle}
        >
          See Purchases
        </button>
      </Link>
      <hr />
    </section>
  );
}
