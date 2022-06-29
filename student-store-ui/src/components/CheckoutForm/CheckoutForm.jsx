import * as React from 'react';
import './CheckoutForm.css';

export default function CheckoutForm({
  isOpen, isFetching, shoppingCart, checkoutForm, handleOnToggle,
  handleOnCheckoutFormChange, handleOnSubmitCheckoutForm,
  handleTryAgain, error, purchaseCompleted, purchaseInfo,
}) {
  // **********************************************************************
  // CONSTANTS
  // **********************************************************************

  const checkoutSuccessMsg = `${purchaseInfo.name}, your purchase was successfully completed! 
  A confirmation and breakdown of your purchase was sent to your email: ${purchaseInfo.email}.`;

  const checkoutFailMsg = 'Your purchase could not be completed. '
  + 'Please try again or contact our (imaginary and not real) customer support.';

  // **********************************************************************
  // ELEMENT RENDERING
  // **********************************************************************

  // loading
  if (isFetching) {
    return (
      <div className="checkout-loading">
        Loading...
      </div>
    );
  }

  // if purchase was recently completed
  if (purchaseCompleted) {
    // if no error occurred during purchase, display receipt
    if (error === '') {
      const len = purchaseInfo.receipt.lines.length;
      // price line is added manually because line returns $NaN if purchase is too expensive.
      return (
        <div className="checkout-complete">
          <p className="success notification">Success!</p>
          <p className="notification">{checkoutSuccessMsg}</p>
          <p className="notification">{'Here\'s your purchase breakdown:'}</p>
          {purchaseInfo.receipt.lines.map((line, i) => {
            if (i === 0 || i >= len - 1) {
              return null;
            }
            // weird key generation, sorry :(
            const lineArr = line.split(' ');
            return <p key={lineArr[2] + lineArr[3]}>{`• ${line}`}</p>;
          })}
          <p key="price">{`- After taxes and fees were applied, the total comes out to $${purchaseInfo.total}`}</p>
          <p className="notification">We hope you shop with us again!</p>
          <button
            type="button"
            className="checkout-button"
            onClick={handleOnToggle}
          >
            Keep Shopping
          </button>
        </div>
      );
    }
    // purchase error
    return (
      <div className="checkout-complete error">
        <p className="error notification">{checkoutFailMsg}</p>
        <button
          type="button"
          className="checkout-button"
          onClick={handleTryAgain}
        >
          Try Again
        </button>
      </div>
    );
  }

  // return no CheckoutForm if empty shopping cart or sidebar is closed
  if (shoppingCart.length === 0 || !isOpen) return null;

  // Checkout issue messages for uncompleted checkout form
  let checkoutIssue = '';
  if (error === 'empty email') {
    checkoutIssue = (<p className="checkout-fail">Please enter your email.</p>);
  } else if (error === 'empty name') {
    checkoutIssue = (<p className="checkout-fail">Please enter your name.</p>);
  } else if (error === 'invalid email') {
    checkoutIssue = (<p className="checkout-fail">Please enter a valid email.</p>);
  }
  // checkout info input form
  return (
    <div className="checkout-form">
      <h3 className="form-title">~ Checkout Form ~</h3>
      <div className="inputs">
        <label className="checkout-label" htmlFor="email">
          Email:
          <input
            className="checkout-form-input email"
            type="email"
            name="email"
            placeholder="student@codepath.org"
            onChange={(e) => handleOnCheckoutFormChange('email', e.target.value)}
            value={checkoutForm.email}
          />
        </label>
        <br />
        <label className="checkout-label" htmlFor="name">
          Name:
          <input
            className="checkout-form-input name"
            type="text"
            name="name"
            placeholder="Student Name"
            onChange={(e) => handleOnCheckoutFormChange('name', e.target.value)}
            value={checkoutForm.name}
          />
        </label>
      </div>
      <br />
      <button
        type="button"
        className="checkout-button"
        onClick={handleOnSubmitCheckoutForm}
      >
        Checkout
      </button>
      {checkoutIssue}
    </div>
  );
}
